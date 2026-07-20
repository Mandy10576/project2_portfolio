/**
 * Skill Routes
 * ------------
 * REST Endpoints for Skill Resources.
 */
import express from 'express';
import {
  getSkills,
  createSkill,
  updateSkill,
  deleteSkill,
} from '../controllers/skillController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.route('/')
  .get(getSkills)
  .post(protect, createSkill);

router.route('/:id')
  .put(protect, updateSkill)
  .delete(protect, deleteSkill);

export default router;
