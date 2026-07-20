/**
 * Project Controller
 * ------------------
 * Handles CRUD operations for portfolio projects.
 */
import prisma from '../config/db.js';
import AppError from '../utils/appError.js';

/**
 * @route   GET /api/projects
 * @desc    Get all projects (public)
 * @access  Public
 */
export const getProjects = async (req, res, next) => {
  try {
    const { featured } = req.query;

    const whereCondition = {};
    if (featured === 'true') {
      whereCondition.featured = true;
    }

    const projects = await prisma.project.findMany({
      where: whereCondition,
      orderBy: { createdDate: 'desc' },
    });

    res.status(200).json({
      status: 'success',
      results: projects.length,
      data: { projects },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @route   GET /api/projects/:id
 * @desc    Get single project by ID
 * @access  Public
 */
export const getProjectById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const project = await prisma.project.findUnique({ where: { id } });

    if (!project) {
      return next(new AppError('Project not found', 404));
    }

    res.status(200).json({
      status: 'success',
      data: { project },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @route   POST /api/projects
 * @desc    Create new project
 * @access  Private (Admin)
 */
export const createProject = async (req, res, next) => {
  try {
    const { title, description, technologies, githubUrl, liveDemoUrl, image, featured, createdDate } = req.body;

    if (!title || !description) {
      return next(new AppError('Title and description are required fields.', 400));
    }

    // Standardize technologies array
    let techArray = [];
    if (Array.isArray(technologies)) {
      techArray = technologies;
    } else if (typeof technologies === 'string') {
      techArray = technologies.split(',').map((t) => t.trim()).filter(Boolean);
    }

    const newProject = await prisma.project.create({
      data: {
        title,
        description,
        technologies: techArray,
        githubUrl: githubUrl || null,
        liveDemoUrl: liveDemoUrl || null,
        image: image || null,
        featured: Boolean(featured),
        createdDate: createdDate ? new Date(createdDate) : new Date(),
      },
    });

    res.status(201).json({
      status: 'success',
      message: 'Project created successfully',
      data: { project: newProject },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @route   PUT /api/projects/:id
 * @desc    Update an existing project
 * @access  Private (Admin)
 */
export const updateProject = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, description, technologies, githubUrl, liveDemoUrl, image, featured, createdDate } = req.body;

    // Verify project exists
    const existingProject = await prisma.project.findUnique({ where: { id } });
    if (!existingProject) {
      return next(new AppError('Project not found', 404));
    }

    let techArray = existingProject.technologies;
    if (technologies !== undefined) {
      if (Array.isArray(technologies)) {
        techArray = technologies;
      } else if (typeof technologies === 'string') {
        techArray = technologies.split(',').map((t) => t.trim()).filter(Boolean);
      }
    }

    const updatedProject = await prisma.project.update({
      where: { id },
      data: {
        title: title !== undefined ? title : existingProject.title,
        description: description !== undefined ? description : existingProject.description,
        technologies: techArray,
        githubUrl: githubUrl !== undefined ? githubUrl : existingProject.githubUrl,
        liveDemoUrl: liveDemoUrl !== undefined ? liveDemoUrl : existingProject.liveDemoUrl,
        image: image !== undefined ? image : existingProject.image,
        featured: featured !== undefined ? Boolean(featured) : existingProject.featured,
        createdDate: createdDate ? new Date(createdDate) : existingProject.createdDate,
      },
    });

    res.status(200).json({
      status: 'success',
      message: 'Project updated successfully',
      data: { project: updatedProject },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @route   DELETE /api/projects/:id
 * @desc    Delete a project
 * @access  Private (Admin)
 */
export const deleteProject = async (req, res, next) => {
  try {
    const { id } = req.params;

    const existingProject = await prisma.project.findUnique({ where: { id } });
    if (!existingProject) {
      return next(new AppError('Project not found', 404));
    }

    await prisma.project.delete({ where: { id } });

    res.status(200).json({
      status: 'success',
      message: 'Project deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};
