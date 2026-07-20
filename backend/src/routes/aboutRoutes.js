/**
 * About Routes
 * ------------
 * REST Endpoints for About Section and Bio statistics.
 */
import express from 'express';
import { getAbout, updateAbout } from '../controllers/aboutController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.route('/')
  .get(getAbout)
  .put(protect, updateAbout);

export default router;
