from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from datetime import datetime
import smtplib
import os
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

router = APIRouter(prefix="/api/contact", tags=["contact"])

# In-memory store (replace with MongoDB in Phase 2)
messages = []


class ContactMessage(BaseModel):
    name: str
    email: str
    subject: str = ""
    message: str


def send_email(data: ContactMessage):
    """Send email notification via Gmail SMTP."""
    host     = os.getenv("EMAIL_HOST", "smtp.gmail.com")
    port     = int(os.getenv("EMAIL_PORT", 587))
    username = os.getenv("EMAIL_USERNAME", "")
    password = os.getenv("EMAIL_PASSWORD", "")
    notify   = os.getenv("NOTIFY_EMAIL", username)

    if not username or not password:
        print("⚠️  Email credentials not set — skipping email send")
        return False

    # Build email
    msg = MIMEMultipart("alternative")
    msg["Subject"] = f"[Portfolio] New message from {data.name}"
    msg["From"]    = username
    msg["To"]      = notify

    body = f"""
New contact form submission on your portfolio:

Name:    {data.name}
Email:   {data.email}
Subject: {data.subject or '(no subject)'}

Message:
{data.message}

---
Reply directly to: {data.email}
"""

    html_body = f"""
<html><body style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
  <h2 style="color: #c9a84c; border-bottom: 1px solid #eee; padding-bottom: 10px;">
    New Portfolio Message
  </h2>
  <table style="width:100%; border-collapse: collapse;">
    <tr><td style="padding: 8px 0; color: #666; width: 80px;"><strong>From</strong></td><td>{data.name}</td></tr>
    <tr><td style="padding: 8px 0; color: #666;"><strong>Email</strong></td><td><a href="mailto:{data.email}">{data.email}</a></td></tr>
    <tr><td style="padding: 8px 0; color: #666;"><strong>Subject</strong></td><td>{data.subject or '(no subject)'}</td></tr>
  </table>
  <div style="margin-top: 20px; padding: 16px; background: #f9f9f9; border-left: 3px solid #c9a84c;">
    <p style="margin: 0; white-space: pre-wrap;">{data.message}</p>
  </div>
  <p style="margin-top: 20px; color: #999; font-size: 12px;">
    Sent from your portfolio contact form.
    <a href="mailto:{data.email}">Reply to {data.name}</a>
  </p>
</body></html>
"""

    msg.attach(MIMEText(body,      "plain"))
    msg.attach(MIMEText(html_body, "html"))

    # Send via Gmail SMTP
    with smtplib.SMTP(host, port) as server:
        server.ehlo()
        server.starttls()
        server.login(username, password)
        server.sendmail(username, notify, msg.as_string())

    return True


@router.post("/")
async def send_message(data: ContactMessage):
    # Basic validation
    if len(data.name.strip()) < 2:
        raise HTTPException(status_code=422, detail="Name too short")
    if len(data.message.strip()) < 5:
        raise HTTPException(status_code=422, detail="Message too short")
    if "@" not in data.email or "." not in data.email:
        raise HTTPException(status_code=422, detail="Invalid email")

    # Save message (always works)
    entry = {
        "id":          len(messages) + 1,
        "name":        data.name,
        "email":       data.email,
        "subject":     data.subject,
        "message":     data.message,
        "received_at": datetime.utcnow().isoformat(),
    }
    messages.append(entry)
    print(f"💾 Saved message #{entry['id']} from {data.name} <{data.email}>")

    # Send email (best-effort — never crash the response if it fails)
    email_sent = False
    try:
        email_sent = send_email(data)
        if email_sent:
            print(f"📧 Email notification sent for message #{entry['id']}")
    except Exception as e:
        print(f"⚠️  Email send failed (message still saved): {e}")

    return {
        "success":    True,
        "message":    "Message received! I'll get back to you soon.",
        "email_sent": email_sent,
        "id":         entry["id"],
    }


@router.get("/messages")
async def get_messages():
    """View all saved messages."""
    return {"count": len(messages), "messages": messages}
