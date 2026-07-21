/**
 * Express Application Setup
 * -------------------------
 * Configures middleware, static folders, routes, CORS, and error handlers.
 */
import express from 'express';
import cors from 'cors';
import path from 'path';

// Import Route Handlers
import authRoutes from './routes/authRoutes.js';
import projectRoutes from './routes/projectRoutes.js';
import skillRoutes from './routes/skillRoutes.js';
import experienceRoutes from './routes/experienceRoutes.js';
import aboutRoutes from './routes/aboutRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';

// Import Custom Middlewares
import errorHandler from './middlewares/errorHandler.js';
import AppError from './utils/appError.js';

const app = express();

// 1. Enable CORS for Vercel Frontend & Localhost
const allowedOrigins = [
  process.env.CLIENT_URL,
  'https://project2-portfolio-navy.vercel.app',
  'http://localhost:5173',
  'http://localhost:3000',
].filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin or if origin is allowed or is vercel app
      if (
        !origin ||
        allowedOrigins.includes(origin) ||
        origin.endsWith('.vercel.app') ||
        process.env.NODE_ENV !== 'production'
      ) {
        callback(null, true);
      } else {
        callback(new Error(`CORS error: Origin ${origin} not allowed`));
      }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

// 2. Parse Incoming JSON requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 3. Serve Static Uploaded Files
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

// 4. API Health Check Route
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'Portfolio CMS Backend API is healthy and running!',
    timestamp: new Date().toISOString(),
  });
});

// 5. Mount API Modules
app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/skills', skillRoutes);
app.use('/api/experiences', experienceRoutes);
app.use('/api/about', aboutRoutes);
app.use('/api/upload', uploadRoutes);

// 6. Handle Undefined Routes (404)
app.all('*', (req, res, next) => {
  next(new AppError(`Cannot find ${req.originalUrl} on this server!`, 404));
});

// 7. Global Centralized Error Handler
app.use(errorHandler);

export default app;
