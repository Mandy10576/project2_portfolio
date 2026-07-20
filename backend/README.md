# Express.js + Prisma PostgreSQL Backend API

This is the production-ready Node.js & Express.js backend API powered by PostgreSQL and Prisma ORM for the Portfolio & Admin CMS.

---

## 🏗️ Architecture (MVC Pattern)

```text
backend/
├── prisma/
│   └── schema.prisma       # Database models (User, Project, Skill, Experience, About)
├── src/
│   ├── config/             # Database connection setup (Prisma)
│   ├── controllers/        # Business logic for API endpoints
│   ├── middlewares/        # JWT auth protection, error handling & Multer upload
│   ├── routes/             # RESTful API route declarations
│   ├── utils/              # Custom AppError & DB seeder script
│   ├── app.js              # Express app setup, CORS & static serving
│   └── server.js           # Server listener entry point
└── uploads/                # Local file storage for project images
```

---

## 🔑 Key Features

- **PostgreSQL + Prisma ORM**: Type-safe database queries and migrations.
- **JWT Authentication**: Secure login issuing JSON Web Tokens for protected admin routes.
- **bcrypt Password Hashing**: Passwords are securely salted and hashed.
- **Multer File Uploads**: Image upload & deletion endpoints for portfolio projects and profile pictures.
- **CORS Configured**: Ready for Vercel production frontend integration.

---

## 🚀 Local Development Setup

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Configure Environment Variables**:
   Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```
   Set your `DATABASE_URL` (AWS RDS or local PostgreSQL) and `JWT_SECRET`.

3. **Generate Prisma Client & Run Seed**:
   ```bash
   npx prisma generate
   npm run seed
   ```

4. **Start Development Server**:
   ```bash
   npm run dev
   ```
   The API will run on `http://localhost:5000`. Test health status at `http://localhost:5000/api/health`.

---

## ☁️ AWS EC2 Deployment Guide

1. Launch an Ubuntu EC2 instance on AWS (Allow HTTP 80, HTTPS 443, and Custom TCP 5000 in Security Group).
2. SSH into your instance:
   ```bash
   ssh -i your-key.pem ubuntu@your-ec2-ip
   ```
3. Install Node.js & PM2:
   ```bash
   curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
   sudo apt-get install -y nodejs
   sudo npm install -g pm2
   ```
4. Clone code, create `.env`, generate Prisma client:
   ```bash
   cd backend
   npm install --production
   npx prisma generate
   ```
5. Start backend server with PM2:
   ```bash
   pm2 start src/server.js --name portfolio-backend
   pm2 save
   pm2 startup
   ```
