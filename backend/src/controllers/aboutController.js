/**
 * About Controller
 * ----------------
 * Handles fetching and updating profile bio, headline, and stats.
 */
import prisma from '../config/db.js';

export const getAbout = async (req, res, next) => {
  try {
    let about = await prisma.about.findFirst();

    // If no about record exists, create default fallback
    if (!about) {
      about = await prisma.about.create({
        data: {
          headline: 'Full Stack Software Engineer & Web Developer',
          bio: 'Passionate full-stack developer dedicated to building responsive, scalable, and high-performance web applications using modern web technologies like React, Node.js, Express, and PostgreSQL.',
          experienceYears: 3,
          completedProjects: 15,
          clientsCount: 10,
          location: 'San Francisco, CA',
          email: 'alex@example.com',
          phone: '+1 (555) 019-2834',
          resumeUrl: '#',
        },
      });
    }

    res.status(200).json({
      status: 'success',
      data: { about },
    });
  } catch (error) {
    next(error);
  }
};

export const updateAbout = async (req, res, next) => {
  try {
    let about = await prisma.about.findFirst();

    const {
      headline,
      bio,
      experienceYears,
      completedProjects,
      clientsCount,
      location,
      email,
      phone,
      resumeUrl,
    } = req.body;

    const updateData = {
      headline: headline !== undefined ? headline : about?.headline,
      bio: bio !== undefined ? bio : about?.bio,
      experienceYears: experienceYears !== undefined ? Number(experienceYears) : about?.experienceYears,
      completedProjects: completedProjects !== undefined ? Number(completedProjects) : about?.completedProjects,
      clientsCount: clientsCount !== undefined ? Number(clientsCount) : about?.clientsCount,
      location: location !== undefined ? location : about?.location,
      email: email !== undefined ? email : about?.email,
      phone: phone !== undefined ? phone : about?.phone,
      resumeUrl: resumeUrl !== undefined ? resumeUrl : about?.resumeUrl,
    };

    if (about) {
      about = await prisma.about.update({
        where: { id: about.id },
        data: updateData,
      });
    } else {
      about = await prisma.about.create({
        data: updateData,
      });
    }

    res.status(200).json({
      status: 'success',
      message: 'About section updated successfully',
      data: { about },
    });
  } catch (error) {
    next(error);
  }
};
