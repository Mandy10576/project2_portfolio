/**
 * Auth Routes
 * -----------
 * Endpoints for Login, Current Admin User, and Profile Updates.
 */
import express from 'express';
import { login, getMe, updateProfile } from '../controllers/authController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/login', login);
router.get('/me', protect, getMe);
router.put('/profile', protect, updateProfile);

export default router;
