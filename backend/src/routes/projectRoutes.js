/**
 * Project Routes
 * --------------
 * REST Endpoints for Project Resources.
 * GET endpoints are public, while POST, PUT, DELETE require JWT Authentication.
 */
import express from 'express';
import {
  getProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
} from '../controllers/projectController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.route('/')
  .get(getProjects)
  .post(protect, createProject);

router.route('/:id')
  .get(getProjectById)
  .put(protect, updateProject)
  .delete(protect, deleteProject);

export default router;
