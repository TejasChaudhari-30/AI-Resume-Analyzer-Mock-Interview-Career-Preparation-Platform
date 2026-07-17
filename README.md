# 🚀 AI Resume Analyzer & Mock Interview Career Preparation Platform

An AI-powered career preparation platform that helps users improve their resumes, receive personalized AI feedback, and practice mock interviews based on their resumes and target job roles.

Built using **React**, **Node.js**, **Express.js**, **PostgreSQL (Neon)**, and **Google Gemini AI**.

---

## 🌐 Live Demo

### Frontend
https://YOUR-VERCEL-URL.vercel.app

### Backend API
https://YOUR-RENDER-URL.onrender.com

---

# ✨ Features

### 👤 User Authentication

- Register & Login
- JWT Authentication
- Secure Password Hashing (bcrypt)

---

### 📄 Resume Management

- Upload PDF Resume
- Resume Parsing
- Resume Storage
- Resume History

---

### 🤖 AI Resume Review

- AI-powered Resume Analysis
- ATS-style Resume Feedback
- Strengths & Weaknesses
- Improvement Suggestions
- Resume Score

Powered by Google Gemini AI.

---

### 🎤 AI Mock Interview

Generate interview questions based on:

- Resume
- Target Role
- Difficulty Level

Supports:

- Easy
- Medium
- Hard

---

### 📝 Interview Evaluation

- AI evaluates answers
- Overall Score
- Question-wise Feedback
- Performance Analysis

---

### 📊 Dashboard

Personalized dashboard including:

- Resume Statistics
- Interview Statistics
- Average Score
- Recent Interviews
- Latest Resume
- Resume Review Summary
- Progress Tracking

---

### 🌙 Modern UI

- Responsive Design
- Dark Mode
- Beautiful Dashboard
- Smooth Animations
- Premium Tailwind CSS Interface

---

# 🛠 Tech Stack

## Frontend

- React.js
- React Router
- Tailwind CSS
- Axios
- React Hook Form

---

## Backend

- Node.js
- Express.js
- JWT Authentication
- Multer
- pdf-parse

---

## Database

- PostgreSQL
- Neon Database

---

## AI

- Google Gemini API

---

## Deployment

- Vercel (Frontend)
- Render (Backend)
- Neon (Database)

---

# 📂 Project Structure

```
AI-Resume-Analyzer-Mock-Interview-Career-Preparation-Platform/

├── frontend/
│   └── ai-interview-frontend/
│       ├── src/
│       ├── public/
│       └── package.json
│
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── routes/
│   │   ├── database/
│   │   ├── utils/
│   │   └── validations/
│   │
│   ├── uploads/
│   └── package.json
│
└── README.md
```

---

# ⚙️ Installation

## Clone Repository

```bash
git clone https://github.com/YOUR_USERNAME/AI-Resume-Analyzer-Mock-Interview-Career-Preparation-Platform.git

cd AI-Resume-Analyzer-Mock-Interview-Career-Preparation-Platform
```

---

## Backend Setup

```bash
cd backend

npm install
```

Create a `.env` file:

```env
PORT=5000

DATABASE_URL=your_neon_database_url

JWT_SECRET=your_secret

GEMINI_API_KEY=your_gemini_api_key
```

Start backend:

```bash
npm run dev
```

---

## Frontend Setup

```bash
cd frontend/ai-interview-frontend

npm install
```

Create `.env`:

```env
VITE_API_URL=http://localhost:5000/api
```

Run:

```bash
npm run dev
```

---

# 🚀 Production Deployment

Frontend:

- Vercel

Backend:

- Render

Database:

- Neon PostgreSQL

---

# 📸 Screenshots

Add screenshots here:

- Login Page
- Dashboard
- Resume Upload
- Resume Review
- Interview Generation
- Interview Session
- Interview Report
- Profile Page

---

# 🔒 Security

- JWT Authentication
- Password Hashing using bcrypt
- Protected Routes
- Input Validation
- Secure API Communication

---

# 🔮 Future Improvements

- Voice-based AI Interview
- Resume Versioning
- Cloud Storage for Resume Uploads
- Email Verification
- Forgot Password
- AI Career Roadmap
- AI Cover Letter Generator
- AI Job Recommendation
- Company-wise Interview Questions
- Interview Analytics Dashboard

---

# 🤝 Contributing

Contributions are welcome!

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Open a Pull Request

---

# 👨‍💻 Author

**Tejas Chaudhari**

LinkedIn:
https://www.linkedin.com/in/tejas-chaudhari-7021aa332

GitHub:
https://github.com/TejasChaudhari-30

---

# ⭐ Support

If you found this project helpful, consider giving it a ⭐ on GitHub.

It motivates future improvements!

---

## 📜 License

This project is licensed under the MIT License.
