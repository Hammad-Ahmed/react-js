# 🧩 SaaS HR – Leave Request Workflow

A clean full-stack SaaS HR demo built with **Node.js**, **Express**, **React (Vite)**, and **Tailwind CSS**.  
Implements a simple **Leave Request Workflow** for Employees and Managers with clean architecture, reusable components, and mock authentication.

---

## 🚀 Features

✅ Employees can submit leave requests  
✅ Managers can view and approve/reject leave requests  
✅ Validations: past dates, overlapping requests, and leave balance  
✅ Mock login (Employee & Manager)  
✅ Tailwind-styled responsive UI  
✅ Clean architecture and reusable React components  

---

## ⚙️ Setup Instructions

### 🧠 Prerequisites
Make sure you have:
- Node.js (v18+)
- npm or pnpm installed

---

### 🔧 Backend Setup
```bash
cd server
node server.js
```
This starts the backend at **http://localhost:4000**

---

### 💻 Frontend Setup
```bash
npm install
npm run dev
```
This starts the frontend at **http://localhost:5173**

---

## 🔐 Mock Login Credentials

| Role | User ID | Name |
|------|----------|------|
| Employee | `u1` | Alice Employee |
| Manager | `u2` | Bob Manager |

No authentication service is implemented; users are hardcoded for testing.

---

## 🧩 API Endpoints

| Method | Endpoint | Description |
|--------|-----------|-------------|
| **POST** | `/leave/apply` | Employee applies for leave |
| **GET** | `/leave/pending` | Manager views pending requests |
| **POST** | `/leave/approve/:id` | Manager approves or rejects a leave request |
| **GET** | `/leave/summary` | Monthly summary of approved leaves (Manager only) |

All `/leave/*` routes validate roles using the `x-user-role` header.

---

## 🧠 Assumptions

- Users are predefined (mock data).  
- Leave balances and requests are stored **in-memory**.  
- No authentication or persistent storage.  
- Dates are provided in ISO format (`YYYY-MM-DD`).  
- Only managers can access approval and summary routes.  

---

## 🏗 Architecture Overview

This project follows **Clean Architecture** principles for better scalability and testing.

---

## 🧱 Reusable Components

| Component | Description |
|------------|-------------|
| **LeaveForm** | Reusable form with validation and feedback |
| **Navbar** | Displays user info and logout button |

---

## 🧠 Approach

The solution follows a **modular, clean architecture** separating:
- **Core business logic** (apply, approve, summarize)
- **HTTP interface layer** (controllers)
- **Data layer** (mock repositories)
- **Presentation layer** (React components)

Frontend emphasizes **reusable UI**, **role-based rendering**, and **Tailwind utility classes** for consistency.

---

## 🧰 Tech Stack

**Frontend:**  
- React (Vite)  
- Tailwind CSS  
- Axios  

**Backend:**  
- Node.js + Express  
- date-fns  
- UUID  

**Testing:**  
- Vitest  
- React Testing Library  

---

## 🧾 Example Workflow

1. **Login** as Employee → Fill form → Submit leave  
2. **Login** as Manager → See pending requests → Approve / Reject  
3. **Manager** can view monthly summary chart  

---

## 👨‍💻 Author
**Hammad Ahmed**  
_Senior Full Stack Developer _
