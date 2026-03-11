# Sai Prajapati — Portfolio

> Personal portfolio website built with **React + Vite** (frontend) and **FastAPI** (backend).

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- Python 3.11+
- Git

### Frontend
```bash
cd frontend
npm install
npm run dev
# → http://localhost:5173
```

### Backend
```bash
cd backend
python -m venv venv
source venv/bin/activate      # Windows: venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env          # fill in your values
uvicorn app.main:app --reload --port 8000
# → http://localhost:8000
# → API docs: http://localhost:8000/docs
```

## 📁 Structure
```
sai-portfolio/
├── frontend/          React + Vite + Framer Motion
│   └── src/
│       ├── components/   UI components
│       ├── data.js        All portfolio content
│       └── index.css      Design tokens
└── backend/           FastAPI
    └── app/
        ├── main.py        Entry point
        └── routes/        API endpoints
```

## 🌐 Deployment
- **Frontend** → Vercel (auto-deploy from GitHub)
- **Backend**  → Render.com (auto-deploy from GitHub)
- **Database** → MongoDB Atlas (Phase 2)

## ✏️ Updating Content
Edit `frontend/src/data.js` to update all portfolio content — no code changes needed.

## 📡 API Endpoints
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/health | Health check |
| GET | /api/projects | All projects |
| GET | /api/projects/{id} | Single project |
| GET | /api/skills | All skills |
| GET | /api/experience | Work experience |
| GET | /api/experience/education | Education |
| POST | /api/contact | Contact form |

## 🔮 Phase 2 (Planned)
- [ ] MongoDB Atlas integration
- [ ] Email notifications on contact
- [ ] AI Chatbot (Gemini/OpenAI)
- [ ] Blog section
