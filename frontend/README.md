# React + Vite + Tailwind CSS v4 Frontend

This is the modern, responsive portfolio frontend with an integrated Admin CMS built with React, Vite, and Tailwind CSS v4.

---

## 🎨 Features & Pages

- **Public Portfolio**:
  - Hero section with animated particle glows & call-to-action buttons
  - About section with experience metrics counter
  - Filterable Technical Skills catalog
  - Case study Projects display with tech badges & demo links
  - Work Experience interactive timeline
  - Contact form & direct email/phone cards
- **Admin CMS Dashboard**:
  - Secure JWT Login Screen
  - Overview stats metrics cards
  - Full CRUD for Projects + File/URL Image Uploader & Deleter
  - Full CRUD for Technical Skills
  - Full CRUD for Work Experience
  - Live bio & statistics editor (About section)
  - Admin Profile & Password Update

---

## 🚀 Local Setup

1. **Install Dependencies**:
   ```bash
   npm install
   ```
2. **Set Environment Variables**:
   Create a `.env` file:
   ```env
   VITE_API_URL=http://localhost:5000/api
   ```
3. **Run Dev Server**:
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173`.

---

## 🔺 Vercel Deployment Guide

1. Push your repository to GitHub / GitLab.
2. Log into [Vercel](https://vercel.com) and click **Add New Project**.
3. Import your repository and set Root Directory to `frontend`.
4. Add Environment Variable:
   - `VITE_API_URL`: Your deployed Express backend API URL (e.g. `http://your-ec2-ip:5000/api`).
5. Click **Deploy**. Vercel will automatically build and publish your SPA with client routing rewrites using `vercel.json`.
