// ── SAI PRAJAPATI — PORTFOLIO DATA ───────────────────────────────────────────
// Edit this file to update your portfolio content

export const personal = {
  name: "Sai Prajapati",
  title: "Software Engineer",
  roles: [
    "Software Engineer",
    "ML Engineer",
    "Backend Developer",
    "AI Enthusiast",
    "Problem Solver",
  ],
  email: "saiprajapati3085@gmail.com",
  phone: "+91-63556-67860",
  location: "Vadodara, Gujarat",
  github: "https://github.com/saiprajapati",
  linkedin: "https://linkedin.com/in/sai-prajapati",
  bio: "Results-driven Computer Science student skilled in Python-based ML workflows, data preprocessing, and backend systems. I build end-to-end ML pipelines and scalable REST APIs — combining analytical thinking with a practical approach to solving real-world problems through AI-driven solutions.",
  shortBio: "Building intelligent systems at the intersection of ML and backend engineering.",
  university: "VIT Bhopal University",
  degree: "B.Tech in Computer Science Engineering",
  graduationYear: "2027",
  minor: "IIT Mandi — Minor in CSE & Advanced Technologies",
  available: true,
};

export const skills = [
  // Languages
  { name: "Python",       category: "Languages",  level: 90 },
  { name: "JavaScript",   category: "Languages",  level: 75 },
  { name: "C++",          category: "Languages",  level: 70 },
  { name: "Java",         category: "Languages",  level: 65 },
  { name: "SQL",          category: "Languages",  level: 72 },

  // ML / AI
  { name: "scikit-learn", category: "ML & AI",    level: 85 },
  { name: "TensorFlow",   category: "ML & AI",    level: 72 },
  { name: "PyTorch",      category: "ML & AI",    level: 68 },
  { name: "OpenCV",       category: "ML & AI",    level: 80 },
  { name: "Pandas / NumPy", category: "ML & AI",  level: 88 },

  // Backend
  { name: "Node.js",      category: "Backend",    level: 78 },
  { name: "Express.js",   category: "Backend",    level: 78 },
  { name: "REST APIs",    category: "Backend",    level: 85 },
  { name: "FastAPI",      category: "Backend",    level: 70 },

  // Databases
  { name: "MongoDB",      category: "Databases",  level: 80 },
  { name: "MySQL",        category: "Databases",  level: 72 },

  // Tools
  { name: "Git / GitHub", category: "Tools",      level: 88 },
  { name: "Linux",        category: "Tools",      level: 75 },
  { name: "Postman",      category: "Tools",      level: 82 },
  { name: "Docker",       category: "Tools",      level: 55 },
];

export const skillCategories = ["All", "Languages", "ML & AI", "Backend", "Databases", "Tools"];

export const projects = [
  {
    id: 1,
    title: "House Price Prediction",
    subtitle: "Regression Model",
    description: "ML model predicting house prices with engineered features, missing-value imputation, and categorical encoding. Evaluated using RMSE and R² metrics.",
    longDescription: "Built a complete regression pipeline from raw data to deployment-ready model. Engineered features through missing-value imputation and categorical encoding. Compared multiple regression algorithms and evaluated performance using RMSE and R² to select the best model.",
    tech: ["Python", "scikit-learn", "Pandas", "NumPy", "Matplotlib"],
    tags: ["ml", "python"],
    github: "https://github.com/saiprajapati/House-Price-Prediction",
    live: null,
    featured: true,
    year: 2024,
    icon: "🏠",
    color: "#c9a84c",
  },
  {
    id: 2,
    title: "Secure Authentication Backend",
    subtitle: "REST API",
    description: "Production-grade JWT-based REST API with role-based route protection and MVC architecture. Built for scalability and security.",
    longDescription: "Designed and built a complete authentication system featuring JWT token management, role-based access control (RBAC), and a clean MVC architecture. Routes are protected by middleware that validates tokens and checks user roles. Tested with Postman.",
    tech: ["Node.js", "Express.js", "MongoDB", "JWT", "Postman"],
    tags: ["backend", "api"],
    github: "https://github.com/saiprajapati/auth-backend",
    live: null,
    featured: true,
    year: 2024,
    icon: "🔐",
    color: "#4c7bc9",
  },
  {
    id: 3,
    title: "Real-Time Object Detection",
    subtitle: "Computer Vision",
    description: "Live object detection system using OpenCV's DNN module with SSD MobileNet v3, capable of identifying 80 object classes in real-time video.",
    longDescription: "Built an object detection pipeline using OpenCV's built-in DNN module loaded with a pre-trained SSD MobileNet v3 model. The system processes live webcam feed and draws bounding boxes around detected objects with class labels and confidence scores — all 80 COCO classes in real time.",
    tech: ["Python", "OpenCV", "SSD MobileNet v3"],
    tags: ["ml", "cv", "python"],
    github: "https://github.com/saiprajapati/Opencv-Object-Detector",
    live: null,
    featured: false,
    year: 2024,
    icon: "👁️",
    color: "#4cc9a8",
  },
  {
    id: 4,
    title: "Zero Chatbot Series",
    subtitle: "Conversational AI",
    description: "A series of chatbot builds exploring different approaches to conversational AI — from rule-based to ML-powered dialogue systems.",
    longDescription: "An evolving series of chatbot implementations exploring the progression from simple rule-based systems to more intelligent conversational agents. Each iteration builds on the last, experimenting with different NLP techniques and architectures to improve response quality and context awareness.",
    tech: ["Python", "NLP", "Machine Learning"],
    tags: ["ml", "python", "ai"],
    github: "https://github.com/saiprajapati/Zero-Chatbot-Series",
    live: null,
    featured: true,
    year: 2024,
    icon: "🤖",
    color: "#9b4cc9",
  },
];

export const experience = [
  {
    id: 1,
    type: "activity",
    role: "General Secretary",
    org: "MERN Matrix — MERN Stack Club, VIT Bhopal",
    period: "2023 – Present",
    bullets: [
      "Leading technical workshops on MERN stack, REST API design, and Git workflows for 50+ club members.",
      "Mentoring peers in full-stack project architectures, accelerating transition from coursework to production-ready development.",
    ],
    tags: ["Leadership", "Mentoring", "MERN"],
    icon: "🎯",
  },
];

export const education = [
  {
    id: 1,
    degree: "B.Tech — Computer Science Engineering",
    institution: "VIT Bhopal University",
    period: "2023 – 2027",
    detail: "Core coursework in algorithms, OS, databases, and ML fundamentals.",
  },
  {
    id: 2,
    degree: "Minor — CSE & Advanced Technologies",
    institution: "IIT Mandi",
    period: "Jan 2025 – Jan 2026",
    detail: "Advanced topics in AI, data science, and emerging tech.",
  },
  {
    id: 3,
    degree: "Higher Secondary — Science Stream",
    institution: "Green Valley High School, Vadodara",
    period: "2021 – 2023",
    detail: "",
  },
];

export const certifications = [
  {
    name: "Oracle Cloud Infrastructure 2025",
    subtitle: "Certified Generative AI Professional",
    issuer: "Oracle",
    icon: "🔮",
  },
  {
    name: "AWS Cloud Club",
    subtitle: "Machine Learning Camper",
    issuer: "Amazon Web Services",
    icon: "☁️",
  },
  {
    name: "AWS Skill Builder",
    subtitle: "ML & Cloud Fundamentals Badges",
    issuer: "Amazon Web Services",
    icon: "🏅",
  },
];

export const stats = [
  { value: "4+",  label: "Projects Built" },
  { value: "50+", label: "Club Members Led" },
  { value: "3",   label: "Certifications" },
  { value: "5+",  label: "Tech Stacks" },
];
