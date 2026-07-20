/**
 * Experience Controller
 * ---------------------
 * Handles CRUD operations for work experience and education timeline items.
 */
import prisma from '../config/db.js';
import AppError from '../utils/appError.js';

export const getExperiences = async (req, res, next) => {
  try {
    const experiences = await prisma.experience.findMany({
      orderBy: { createdAt: 'desc' },
    });

    res.status(200).json({
      status: 'success',
      results: experiences.length,
      data: { experiences },
    });
  } catch (error) {
    next(error);
  }
};

export const createExperience = async (req, res, next) => {
  try {
    const { role, company, location, startDate, endDate, current, description } = req.body;

    if (!role || !company || !startDate || !description) {
      return next(new AppError('Role, company, start date, and description are required.', 400));
    }

    const newExperience = await prisma.experience.create({
      data: {
        role,
        company,
        location: location || 'Remote',
        startDate,
        endDate: current ? 'Present' : (endDate || ''),
        current: Boolean(current),
        description,
      },
    });

    res.status(201).json({
      status: 'success',
      message: 'Experience entry created successfully',
      data: { experience: newExperience },
    });
  } catch (error) {
    next(error);
  }
};

export const updateExperience = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { role, company, location, startDate, endDate, current, description } = req.body;

    const existingExperience = await prisma.experience.findUnique({ where: { id } });
    if (!existingExperience) {
      return next(new AppError('Experience entry not found', 404));
    }

    const updatedExperience = await prisma.experience.update({
      where: { id },
      data: {
        role: role !== undefined ? role : existingExperience.role,
        company: company !== undefined ? company : existingExperience.company,
        location: location !== undefined ? location : existingExperience.location,
        startDate: startDate !== undefined ? startDate : existingExperience.startDate,
        endDate: current ? 'Present' : (endDate !== undefined ? endDate : existingExperience.endDate),
        current: current !== undefined ? Boolean(current) : existingExperience.current,
        description: description !== undefined ? description : existingExperience.description,
      },
    });

    res.status(200).json({
      status: 'success',
      message: 'Experience entry updated successfully',
      data: { experience: updatedExperience },
    });
  } catch (error) {
    next(error);
  }
};

export const deleteExperience = async (req, res, next) => {
  try {
    const { id } = req.params;

    const existingExperience = await prisma.experience.findUnique({ where: { id } });
    if (!existingExperience) {
      return next(new AppError('Experience entry not found', 404));
    }

    await prisma.experience.delete({ where: { id } });

    res.status(200).json({
      status: 'success',
      message: 'Experience entry deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};
