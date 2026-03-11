from fastapi import APIRouter
from typing import Optional

router = APIRouter(prefix="/api/projects", tags=["projects"])

PROJECTS = [
    {
        "id": 1,
        "title": "House Price Prediction",
        "subtitle": "Regression Model",
        "description": "ML model predicting house prices with engineered features, missing-value imputation, and categorical encoding. Evaluated using RMSE and R² metrics.",
        "long_description": "Built a complete regression pipeline from raw data to deployment-ready model. Engineered features through missing-value imputation and categorical encoding. Compared multiple regression algorithms and evaluated performance using RMSE and R² to select the best model.",
        "tech": ["Python", "scikit-learn", "Pandas", "NumPy", "Matplotlib"],
        "tags": ["ml", "python"],
        "github": "https://github.com/saiprajapati/House-Price-Prediction",
        "live": None,
        "featured": True,
        "year": 2024,
        "icon": "🏠",
    },
    {
        "id": 2,
        "title": "Secure Authentication Backend",
        "subtitle": "REST API",
        "description": "Production-grade JWT-based REST API with role-based route protection and MVC architecture. Built for scalability and security.",
        "long_description": "Designed and built a complete authentication system featuring JWT token management, role-based access control (RBAC), and a clean MVC architecture. Routes are protected by middleware that validates tokens and checks user roles.",
        "tech": ["Node.js", "Express.js", "MongoDB", "JWT", "Postman"],
        "tags": ["backend", "api"],
        "github": "https://github.com/saiprajapati/auth-backend",
        "live": None,
        "featured": True,
        "year": 2024,
        "icon": "🔐",
    },
    {
        "id": 3,
        "title": "Real-Time Object Detection",
        "subtitle": "Computer Vision",
        "description": "Live object detection using OpenCV DNN module with SSD MobileNet v3 — identifies 80 object classes in real-time video.",
        "long_description": "Built an object detection pipeline using OpenCV's built-in DNN module loaded with a pre-trained SSD MobileNet v3 model. Processes live webcam feed and draws bounding boxes with class labels and confidence scores for all 80 COCO classes.",
        "tech": ["Python", "OpenCV", "SSD MobileNet v3"],
        "tags": ["ml", "cv", "python"],
        "github": "https://github.com/saiprajapati/Opencv-Object-Detector",
        "live": None,
        "featured": False,
        "year": 2024,
        "icon": "👁️",
    },
    {
        "id": 4,
        "title": "Zero Chatbot Series",
        "subtitle": "Conversational AI",
        "description": "A series of chatbot builds exploring different approaches to conversational AI — from rule-based to ML-powered dialogue systems.",
        "long_description": "An evolving series of chatbot implementations exploring the progression from simple rule-based systems to more intelligent conversational agents. Each iteration builds on the last, experimenting with different NLP techniques and architectures to improve response quality and context awareness.",
        "tech": ["Python", "NLP", "Machine Learning"],
        "tags": ["ml", "python", "ai"],
        "github": "https://github.com/saiprajapati/Zero-Chatbot-Series",
        "live": None,
        "featured": True,
        "year": 2024,
        "icon": "🤖",
    },
]


@router.get("/")
async def get_projects(tag: Optional[str] = None, featured: Optional[bool] = None):
    result = PROJECTS
    if tag:
        result = [p for p in result if tag in p.get("tags", [])]
    if featured is not None:
        result = [p for p in result if p.get("featured") == featured]
    return result


@router.get("/{project_id}")
async def get_project(project_id: int):
    for p in PROJECTS:
        if p["id"] == project_id:
            return p
    return {"error": "Project not found"}
