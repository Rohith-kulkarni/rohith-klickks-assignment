# React.js & Node.js Authentication System (SQLite)

A simple **Login & Logout Flow** built with **React.js (frontend)** and **Node.js + SQLite (backend)**.  
This project demonstrates **cookie-based authentication**, session handling, and secure password storage with hashing.

---

## Features

- **User Registration** – Create a new account with username & password
- **Login** – Authenticate with stored credentials
- **Session Management** – Stay logged in until explicit logout
- **Logout** – Clear session and redirect to login
- **SQLite Database** – Lightweight DB with **hashed passwords** for security

---

## Project Setup & Run

### Backend Setup

```bash
cd backend
npm install
node server.js
```

### Frontend Setup

```bash
cd frontend
npm install
npm start
```

# Tech stack:

Frontend: React.js, React Router, Axios, Cookies
Backend: Node.js, Express.js, bcrypt, cookie-parser
Database: SQLite3

# Authentication Flow:

User registers → data stored in SQLite (password hashed with bcrypt)

User logs in → server verifies credentials → sets cookie session

Protected pages accessible only when logged in

On logout → cookie cleared → user redirected to login
