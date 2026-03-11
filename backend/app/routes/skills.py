from fastapi import APIRouter

router = APIRouter(prefix="/api/skills", tags=["skills"])

SKILLS = [
    {"name": "Python",        "category": "Languages", "level": 90},
    {"name": "JavaScript",    "category": "Languages", "level": 75},
    {"name": "C++",           "category": "Languages", "level": 70},
    {"name": "Java",          "category": "Languages", "level": 65},
    {"name": "SQL",           "category": "Languages", "level": 72},
    {"name": "scikit-learn",  "category": "ML & AI",   "level": 85},
    {"name": "TensorFlow",    "category": "ML & AI",   "level": 72},
    {"name": "PyTorch",       "category": "ML & AI",   "level": 68},
    {"name": "OpenCV",        "category": "ML & AI",   "level": 80},
    {"name": "Pandas / NumPy","category": "ML & AI",   "level": 88},
    {"name": "Node.js",       "category": "Backend",   "level": 78},
    {"name": "Express.js",    "category": "Backend",   "level": 78},
    {"name": "REST APIs",     "category": "Backend",   "level": 85},
    {"name": "FastAPI",       "category": "Backend",   "level": 70},
    {"name": "MongoDB",       "category": "Databases", "level": 80},
    {"name": "MySQL",         "category": "Databases", "level": 72},
    {"name": "Git / GitHub",  "category": "Tools",     "level": 88},
    {"name": "Linux",         "category": "Tools",     "level": 75},
    {"name": "Postman",       "category": "Tools",     "level": 82},
    {"name": "Docker",        "category": "Tools",     "level": 55},
]


@router.get("/")
async def get_skills(category: str = None):
    """Get all skills, optionally filtered by category."""
    if category:
        return [s for s in SKILLS if s["category"] == category]
    return SKILLS


@router.get("/categories")
async def get_categories():
    """Get list of unique skill categories."""
    cats = list(dict.fromkeys(s["category"] for s in SKILLS))
    return cats
