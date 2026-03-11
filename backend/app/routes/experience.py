from fastapi import APIRouter

router = APIRouter(prefix="/api/experience", tags=["experience"])

EXPERIENCE = [
    {
        "id": 1,
        "type": "activity",
        "role": "General Secretary",
        "org": "MERN Matrix — MERN Stack Club, VIT Bhopal",
        "period": "2023 – Present",
        "bullets": [
            "Leading technical workshops on MERN stack, REST API design, and Git workflows for 50+ club members.",
            "Mentoring peers in full-stack project architectures, accelerating transition from coursework to production-ready development.",
        ],
        "tags": ["Leadership", "Mentoring", "MERN"],
        "icon": "🎯",
    },
]

EDUCATION = [
    {
        "id": 1,
        "degree": "B.Tech — Computer Science Engineering",
        "institution": "VIT Bhopal University",
        "period": "2023 – 2027",
        "detail": "Core coursework in algorithms, OS, databases, and ML fundamentals.",
    },
    {
        "id": 2,
        "degree": "Minor — CSE & Advanced Technologies",
        "institution": "IIT Mandi",
        "period": "Jan 2025 – Jan 2026",
        "detail": "Advanced topics in AI, data science, and emerging technologies.",
    },
    {
        "id": 3,
        "degree": "Higher Secondary — Science Stream",
        "institution": "Green Valley High School, Vadodara",
        "period": "2021 – 2023",
        "detail": "",
    },
]


@router.get("/")
async def get_experience():
    return EXPERIENCE


@router.get("/education")
async def get_education():
    return EDUCATION
