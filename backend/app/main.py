from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import projects, skills, experience, contact

app = FastAPI(
    title="Sai Prajapati — Portfolio API",
    description="Backend API for Sai Prajapati's developer portfolio",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://localhost:4173",
        "https://saiprajapati.dev",        # update with your domain
        "https://sai-portfolio.vercel.app", # update with Vercel URL
    ],
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
    return {"status": "ok", "message": "Sai's portfolio API is running"}


@app.get("/", tags=["root"])
async def root():
    return {"message": "Welcome to Sai Prajapati's Portfolio API. Visit /docs for API documentation."}
