/**
 * Skill Controller
 * ----------------
 * Handles CRUD operations for developer skills (Frontend, Backend, Database, Tools, etc.).
 */
import prisma from '../config/db.js';
import AppError from '../utils/appError.js';

export const getSkills = async (req, res, next) => {
  try {
    const skills = await prisma.skill.findMany({
      orderBy: { proficiency: 'desc' },
    });

    res.status(200).json({
      status: 'success',
      results: skills.length,
      data: { skills },
    });
  } catch (error) {
    next(error);
  }
};

export const createSkill = async (req, res, next) => {
  try {
    const { name, category, proficiency, icon } = req.body;

    if (!name || !category) {
      return next(new AppError('Skill name and category are required.', 400));
    }

    const newSkill = await prisma.skill.create({
      data: {
        name,
        category,
        proficiency: proficiency ? Number(proficiency) : 80,
        icon: icon || null,
      },
    });

    res.status(201).json({
      status: 'success',
      message: 'Skill created successfully',
      data: { skill: newSkill },
    });
  } catch (error) {
    next(error);
  }
};

export const updateSkill = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, category, proficiency, icon } = req.body;

    const existingSkill = await prisma.skill.findUnique({ where: { id } });
    if (!existingSkill) {
      return next(new AppError('Skill not found', 404));
    }

    const updatedSkill = await prisma.skill.update({
      where: { id },
      data: {
        name: name !== undefined ? name : existingSkill.name,
        category: category !== undefined ? category : existingSkill.category,
        proficiency: proficiency !== undefined ? Number(proficiency) : existingSkill.proficiency,
        icon: icon !== undefined ? icon : existingSkill.icon,
      },
    });

    res.status(200).json({
      status: 'success',
      message: 'Skill updated successfully',
      data: { skill: updatedSkill },
    });
  } catch (error) {
    next(error);
  }
};

export const deleteSkill = async (req, res, next) => {
  try {
    const { id } = req.params;

    const existingSkill = await prisma.skill.findUnique({ where: { id } });
    if (!existingSkill) {
      return next(new AppError('Skill not found', 404));
    }

    await prisma.skill.delete({ where: { id } });

    res.status(200).json({
      status: 'success',
      message: 'Skill deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};
