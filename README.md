# 🚀 ResumeForge AI

**Craft. Enhance. Impress.** ResumeForge AI is a full-stack, AI-powered resume builder that takes you from a blank page to a polished, professional resume in minutes. Fill out guided forms, let AI sharpen your wording, pick a beautiful template, and share a live public link — all from one seamless dashboard.

---

## ✨ Highlights

- 🔐 **Secure Auth** — JWT-based login/register with hashed passwords (bcrypt)
- 🧠 **AI-Powered Writing** — Instantly enhance your professional summary and job descriptions using OpenAI
- 📄 **PDF Import** — Already have a resume? Upload it and let the app parse and pre-fill your data
- 🎨 **Multiple Templates** — Classic, Modern, Minimal, and Minimal-with-Image layouts, each fully customizable with an accent color
- 👁️ **Live Preview** — See your resume render in real time as you type
- 🌍 **Public Sharing** — Publish your resume to a shareable, no-login-required link
- ☁️ **Cloud Image Hosting** — Profile photos are stored and served via ImageKit

---

## 🛠️ Tech Stack

**Frontend** 🖥️
React 19 · React Router 7 · Redux Toolkit · Tailwind CSS 4 · Axios · React Hot Toast · react-pdftotext · Vite

**Backend** ⚙️
Node.js · Express 5 · MongoDB + Mongoose · JWT · bcrypt · Multer · ImageKit SDK · OpenAI SDK

---

## 🗂️ Project Structure

```
ResumeForge AI/
├── client/
│   └── src/
│       ├── app/
│       │   ├── store.js
│       │   └── features/authSlice.js  # Auth state (user, token, loading)
│       ├── configs/api.js
│       ├── pages/
│       │   ├── Home.jsx
│       │   ├── Layout.jsx
│       │   ├── Dashboard.jsx
│       │   ├── ResumeForge.jsx
│       │   ├── Preview.jsx
│       │   └── Login.jsx
│       ├── components/
│       ├── components/templates/
│       └── components/home/
│
└── server/
    ├── server.js
    ├── configs/
    │   ├── db.js
    │   ├── ai.js
    │   ├── imageKit.js
    │   └── muter.js
    ├── models/
    │   ├── User.js
    │   └── Resume.js
    ├── Routes/
    │   ├── userRoutes.js
    │   ├── resumeRoutes.js
    │   └── aiRoutes.js
    ├── controllers/
    └── middlewares/authMiddleware.js
```

---

## 🔄 Application Flow

1. **Auth** — User registers/logs in via `/api/user/register` or `/login`. A JWT is issued and stored client-side; Redux (`authSlice`) tracks the session and `App.jsx` rehydrates it on load via `/api/user/data`.
2. **Dashboard** — Authenticated users land on the Dashboard, where they can create a new resume, delete existing ones, or upload an existing PDF resume (parsed client-side with `react-pdftotext` and sent to the AI parser).
3. **Builder** — `ResumeForge.jsx` provides a form-driven editor (personal info, summary, experience, education, skills, projects) with a live `ResumePreview` rendered in the selected template and accent color. Changes are saved via `/api/resume/update`.
4. **AI Enhancement** — Users can request AI-polished professional summaries or job description bullet points, proxied through the server to OpenAI so API keys stay server-side.
5. **Templates** — Users pick from multiple resume templates (Classic, Modern, Minimal, MinimalImage); rendering is shared between the builder preview and the public view.
6. **Share/Preview** — Marking a resume `public` exposes it at `/view/:resumeId`, fetched anonymously — no auth required.

---

Built by Peehal 👩🏻‍💻❤️
