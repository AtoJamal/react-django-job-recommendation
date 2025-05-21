# AI-Based Job Recommendation System - Project Context

## 📘 Overview

This project is an **AI-powered Job Recommendation System** designed to intelligently match job seekers with relevant opportunities, and empower employers to post jobs and evaluate applicants. It provides role-based interfaces for **Job Seekers**, **Employers**, and **Admins**, each with its own dashboard and functionality.

The system is being developed using the following stack:

- **Frontend**: React.js (with Vite)
- **Backend**: Django (with Django REST Framework)
- **Database**: MySQL (via XAMPP)
- **AI Integration**: Python-based recommendation engine
- **Authentication**: Django + potential future Firebase extension (inspired by previous projects)

---

## 🎯 Project Goals

- Deliver intelligent job recommendations using AI.
- Offer employers a structured way to manage job posts and view applicants.
- Allow admins to oversee the entire system for transparency and control.
- Provide a modern, intuitive UI with robust backend logic.
- Enable secure, scalable, and modular codebase ready for future enhancements.

---

## 🛠️ Technology Stack

### 📍 Frontend
- **React + Vite**: Lightning-fast development environment with HMR.
- **Plain CSS**: Used for styling (no CSS Modules).
- **Axios**: HTTP client for frontend-backend communication.

### 📍 Backend
- **Django**: Core backend framework for logic, authentication, and API.
- **Django REST Framework**: For building RESTful APIs.
- **MySQL**: Used for persistent structured storage.
- **XAMPP**: Running and managing the local MySQL server.



---

## ✅ Completed Tasks

### ✅ Backend Setup
- Django project (`core`) and app (`api`) created.
- Models defined for users, jobs, and applications.
- Serializers and views created.
- Database connected via MySQL using Django's settings.
- Migrations performed with `--fake` due to existing database schema:
  ```bash
  python manage.py migrate --fake


✅ Backend Functionality Tested from Frontend

Successfully tested frontend → backend API calls by running Django development server and making real HTTP requests.

(env) [arch@archlinux backend]$ python manage.py runserver

Server started successfully:

Starting development server at http://127.0.0.1:8000/

Sample Request Log:

Not Found: /
[19/May/2025 07:12:00] "GET / HTTP/1.1" 404 2161
[19/May/2025 07:12:44] "GET /api/jobseekers/ HTTP/1.1" 200 562
[19/May/2025 07:12:44] "GET /api/jobseekers/ HTTP/1.1" 200 562

✅ This confirms:

    Django backend is working properly.

    /api/jobseekers/ endpoint returns valid responses (200 OK).

    Frontend can successfully fetch data using Axios from the backend.

✅ Frontend Page Structure

Job Seekers:

    JobSeekerAccount.jsx — Account info and password reset combined.

    NotificationList.jsx — Job-related and system alerts.

Employers:

    EmployerAccount.jsx — Profile and company details.

    PostedJobList.jsx — All job postings from this employer.

    ApplicantList.jsx — View applicants per job.

Admins:

    AdminAccount.jsx — Admin profile and password reset.

    JobSeekerList.jsx — List of all job seekers.

    EmployerList.jsx — List of all employers.

    PostedJobList.jsx — Master list of all job posts.

🔄 Current State
Module	Status	Notes
Backend API	✅ Tested	Frontend successfully calls /api/jobseekers/
Frontend UI	✅ Structured	Pages organized by role
Database	✅ Connected	MySQL schema aligned, --fake used to sync
Auth	⚙️ Planned	Either Django or Firebase
AI Model	⚙️ In Progress	Concept prepared, integration pending
📈 Next Steps
🔗 API Development & Integration

    Build all CRUD APIs for job posting, editing, applying, saving, and recommending.

    Connect React frontend to backend using Axios (job search, profile updates, apply, etc.).

🧠 AI Model Integration

    Import trained AI model into Django using pickle or joblib.

    Expose recommendations at /api/recommendations/.

    Log click and application behavior to improve the model over time.

🔒 Authentication

    Add user registration/login with token-based auth (JWT or Django Sessions).

    Optional: switch to Firebase for multi-platform auth consistency.

🛠 Admin Controls

    Dashboard for managing users, job posts, and flagging abuse.

    Admin-level analytics (number of jobs posted, user growth, etc.).

🚀 Deployment

    Backend: Render or Heroku

    Frontend: Vercel or Netlify

    Setup CORS properly between frontend and backend

🧠 Cursor AI: How You Can Help

Cursor AI can now assist with:

    Generating Django serializers, views, and URLs faster.

    Completing Axios calls and error handling in React.

    Auto-writing repetitive forms and table rendering in React.

    Assisting with AI model endpoint logic and feedback loops.

Ensure that:

    You don't reapply migrations manually again (they're already synced).

    Frontend API calls should point to http://127.0.0.1:8000/api/... during dev.

🚧 Future Improvements

    Resume parsing and auto-fill user skills.

    Chat between employers and job seekers.

    PDF resume upload and AI-based evaluation.

    Real-time analytics for admins using charting libraries.

