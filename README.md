# 🚀 Production-Ready Full-Stack Portfolio & Admin CMS

Welcome! This repository contains a production-ready, full-stack **Portfolio Website with an Admin CMS**. It is designed with scalable modular architecture, security best practices, and beginner-friendly explanations.

---

## 📚 Beginner Concept Guide: Understanding the Stack

If you are new to web development, here is how all the pieces fit together:

### 1. What is Full-Stack Web Development?
- **Frontend (Client)**: The user interface built with **React, Vite, and Tailwind CSS**. This is what visitors see in their web browser.
- **Backend (Server)**: The logic layer built with **Node.js and Express.js**. It processes requests, checks security, and communicates with the database.
- **Database (Data Storage)**: **PostgreSQL** hosted on **AWS RDS**. It permanently stores projects, skills, experience timeline, user accounts, and bio info.
- **ORM (Object-Relational Mapper)**: **Prisma**. Instead of writing SQL queries manually, Prisma provides a clean JavaScript API to interact with PostgreSQL.

### 2. How Does Authentication Work? (JWT & bcrypt)
- **bcrypt**: Hashes your plain-text password (e.g. `admin123`) into an uncrackable encrypted string before saving it in PostgreSQL.
- **JWT (JSON Web Token)**: When you log into the Admin CMS, the Express backend generates a signed digital pass (Token). The React frontend attaches this token to every request header (`Authorization: Bearer <token>`) so the backend knows you are authorized to edit or delete content.

### 3. What is MVC Architecture?
- **Model**: Prisma schema definitions (`schema.prisma`) defining data structures.
- **View**: React UI components rendered in the browser.
- **Controller**: Express handler functions (`projectController.js`, `authController.js`) receiving requests and sending JSON responses.

---

## 📁 Repository Folder Structure

```text
Website2/
├── backend/
│   ├── prisma/
│   │   └── schema.prisma         # PostgreSQL Prisma Schema
│   ├── src/
│   │   ├── config/               # Database client config
│   │   ├── controllers/          # Business logic for Auth, Projects, Skills, Exp, About, Uploads
│   │   ├── middlewares/          # JWT auth protection, error handler & Multer upload middleware
│   │   ├── routes/               # Express REST routes
│   │   ├── utils/                # Custom error handler & database seeder
│   │   ├── app.js                # Express app setup, CORS & static asset hosting
│   │   └── server.js             # HTTP Server entry point
│   ├── uploads/                  # Uploaded project images folder
│   ├── .env.example
│   └── package.json
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/           # Navbar, Footer, Hero, About, Skills, Projects, Experience, Contact, AdminLayout
│   │   ├── context/              # AuthContext (login state & session validation)
│   │   ├── pages/                # HomePage, LoginPage & Admin CMS management pages
│   │   ├── services/             # Axios API service client
│   │   ├── App.jsx               # React Router routes
│   │   ├── main.jsx              # React mounting root
│   │   └── index.css             # Tailwind CSS v4 styling & glassmorphism utilities
│   ├── .env.example
│   ├── vercel.json               # SPA routing rewrite rules for Vercel
│   └── package.json
│
└── README.md                     # Full-Stack Beginner Guide & Deployment Manual
```

---

## 💻 Step-by-Step Local Setup Guide

### Step 1: Clone or Navigate to Project
```bash
cd C:\Users\mande\Desktop\Website2
```

### Step 2: Setup Backend
```bash
cd backend
npm install
```
Create a `.env` file inside `backend/` by copying `.env.example`:
```env
PORT=5000
DATABASE_URL="postgresql://postgres:password@localhost:5432/portfoliodb?schema=public"
JWT_SECRET="super_secret_jwt_key_12345"
JWT_EXPIRES_IN="7d"
CLIENT_URL="http://localhost:5173"
```
Run Prisma generation and populate demo data:
```bash
npx prisma generate
npm run seed
```
Start Express backend:
```bash
npm run dev
```
*(Backend will run on `http://localhost:5000`)*

### Step 3: Setup Frontend
Open a new terminal window:
```bash
cd C:\Users\mande\Desktop\Website2/frontend
npm install
```
Create `.env` inside `frontend/`:
```env
VITE_API_URL=http://localhost:5000/api
```
Start Vite React frontend:
```bash
npm run dev
```
*(Frontend will run on `http://localhost:5173`)*

---

## 🔑 Admin CMS Login Credentials

- **Login Route**: `http://localhost:5173/admin/login`
- **Email**: `admin@example.com`
- **Password**: `admin123`

---

## ☁️ Deployment Manual

### 1. AWS RDS PostgreSQL Database Configuration
1. Open the [AWS Management Console](https://aws.amazon.com/console/) and navigate to **RDS**.
2. Click **Create Database**.
3. Select **Standard Create** -> **PostgreSQL**.
4. Choose **Free Tier** or **Dev/Test** template.
5. Set **DB Instance Identifier**: `portfolio-db`.
6. Set Master Username (e.g. `postgres`) and Master Password (e.g. `YourSecurePass123!`).
7. Under **Connectivity**, enable **Publicly Accessible: Yes**.
8. Ensure your RDS Security Group allows inbound connections on PostgreSQL port `5432` from your EC2 IP.
9. Copy your AWS RDS Endpoint. Your final `DATABASE_URL` format will be:
   ```env
   DATABASE_URL="postgresql://postgres:YourSecurePass123!@portfolio-db.c39x81a.us-east-1.rds.amazonaws.com:5432/portfoliodb?schema=public"
   ```

### 2. AWS EC2 Express Backend Deployment
1. Launch an Ubuntu EC2 instance on AWS.
2. In the Security Group rules, add:
   - **HTTP (80)** - Source `0.0.0.0/0`
   - **Custom TCP (5000)** - Source `0.0.0.0/0` (For backend REST API)
3. Connect via SSH:
   ```bash
   ssh -i your-key.pem ubuntu@<your-ec2-public-ip>
   ```
4. Install Node.js v20 and PM2:
   ```bash
   curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
   sudo apt-get install -y nodejs
   sudo npm install -g pm2
   ```
5. Transfer your `backend` project files to EC2.
6. Create `.env` on EC2 with your AWS RDS `DATABASE_URL`, `JWT_SECRET`, and `CLIENT_URL` (your Vercel frontend URL).
7. Run Prisma migration / deployment:
   ```bash
   npx prisma generate
   npx prisma migrate deploy
   npm run seed
   ```
8. Start the process with PM2:
   ```bash
   pm2 start src/server.js --name portfolio-backend
   pm2 save
   pm2 startup
   ```

### 3. Vercel Frontend Deployment
1. Sign in to [Vercel](https://vercel.com).
2. Click **Add New** -> **Project** and import your GitHub repository.
3. Set **Root Directory** to `frontend`.
4. Build settings: Framework Preset **Vite**.
5. Add Environment Variable:
   - Key: `VITE_API_URL`
   - Value: `http://<your-ec2-public-ip>:5000/api`
6. Click **Deploy**. Vercel will build your React app and route client URLs cleanly using `vercel.json`.
