from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, EmailStr
from datetime import datetime
import re

router = APIRouter(prefix="/api/contact", tags=["contact"])

# In-memory store (replace with MongoDB in Phase 2)
messages = []


class ContactMessage(BaseModel):
    name: str
    email: str
    subject: str = ""
    message: str


@router.post("/")
async def send_message(data: ContactMessage):
    """Receive a contact form submission."""
    # Basic validation
    if len(data.name.strip()) < 2:
        raise HTTPException(status_code=422, detail="Name too short")
    if len(data.message.strip()) < 10:
        raise HTTPException(status_code=422, detail="Message too short")
    if not re.match(r"[^@]+@[^@]+\.[^@]+", data.email):
        raise HTTPException(status_code=422, detail="Invalid email")

    # Save message
    entry = {
        "id": len(messages) + 1,
        "name": data.name,
        "email": data.email,
        "subject": data.subject,
        "message": data.message,
        "received_at": datetime.utcnow().isoformat(),
    }
    messages.append(entry)

    # TODO: Add email sending with fastapi-mail in Phase 2
    # await send_notification_email(entry)

    print(f"📬 New message from {data.name} <{data.email}>: {data.message[:60]}...")

    return {"success": True, "message": "Message received. I'll get back to you soon!"}


@router.get("/messages")
async def get_messages():
    """Admin endpoint — view all messages (protect with auth in production)."""
    return messages
