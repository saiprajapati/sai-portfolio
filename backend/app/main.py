from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import os

load_dotenv()  # reads backend/.env automatically

from app.routes import projects, skills, experience, contact

app = FastAPI(
    title="Sai Prajapati — Portfolio API",
    description="Backend API for Sai Prajapati's developer portfolio",
    version="1.0.0",
)

# Read allowed origins from .env — comma separated
raw_origins = os.getenv("ALLOWED_ORIGINS", "http://localhost:5173")
allowed_origins = [o.strip() for o in raw_origins.split(",")]

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(projects.router)
app.include_router(skills.router)
app.include_router(experience.router)
app.include_router(contact.router)


@app.get("/api/health", tags=["health"])
async def health():
    env = os.getenv("ENVIRONMENT", "development")
    return {"status": "ok", "environment": env}


@app.get("/", tags=["root"])
async def root():
    return {"message": "Sai Prajapati Portfolio API. Visit /docs for documentation."}
