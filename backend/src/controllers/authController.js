/**
 * Auth Controller
 * ---------------
 * Manages Admin Login, Token Generation, Profile Fetching, and Profile Updates.
 */
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import prisma from '../config/db.js';
import AppError from '../utils/appError.js';

// Helper function to generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'fallback_secret_key', {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  });
};

/**
 * @route   POST /api/auth/login
 * @desc    Authenticate Admin & Get Token
 * @access  Public
 */
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(new AppError('Please provide email and password', 400));
    }

    // 1. Find user by email
    let user = await prisma.user.findUnique({ where: { email: email.toLowerCase() } });

    // Auto-create default admin if database is not seeded yet
    if (!user) {
      const totalUsers = await prisma.user.count();
      const allowedEmails = ['admin@example.com', 'mandeeprao10576@gmail.com'];
      if (totalUsers === 0 && allowedEmails.includes(email.toLowerCase())) {
        const hashedPassword = await bcrypt.hash('admin123', 10);
        user = await prisma.user.create({
          data: {
            email: email.toLowerCase(),
            password: hashedPassword,
            name: 'Mandy Developer',
            bio: 'Full Stack Software Engineer',
          },
        });
      } else {
        return next(new AppError('Invalid email or password', 401));
      }
    }

    // 2. Compare password hash
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return next(new AppError('Invalid email or password', 401));
    }

    // 3. Issue Token
    const token = generateToken(user.id);

    // Remove password from response payload
    const { password: _, ...userWithoutPassword } = user;

    res.status(200).json({
      status: 'success',
      token,
      data: { user: userWithoutPassword },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @route   GET /api/auth/me
 * @desc    Get Current Logged In Admin Profile
 * @access  Private (Protected)
 */
export const getMe = async (req, res, next) => {
  try {
    res.status(200).json({
      status: 'success',
      data: { user: req.user },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @route   PUT /api/auth/profile
 * @desc    Update Admin Profile (Name, Bio, Links, Password)
 * @access  Private (Protected)
 */
export const updateProfile = async (req, res, next) => {
  try {
    const { name, bio, avatar, githubUrl, linkedinUrl, twitterUrl, password } = req.body;

    const updateData = {
      name: name !== undefined ? name : req.user.name,
      bio: bio !== undefined ? bio : req.user.bio,
      avatar: avatar !== undefined ? avatar : req.user.avatar,
      githubUrl: githubUrl !== undefined ? githubUrl : req.user.githubUrl,
      linkedinUrl: linkedinUrl !== undefined ? linkedinUrl : req.user.linkedinUrl,
      twitterUrl: twitterUrl !== undefined ? twitterUrl : req.user.twitterUrl,
    };

    // If updating password, hash it first
    if (password && password.trim() !== '') {
      updateData.password = await bcrypt.hash(password, 10);
    }

    const updatedUser = await prisma.user.update({
      where: { id: req.user.id },
      data: updateData,
    });

    const { password: _, ...userWithoutPassword } = updatedUser;

    res.status(200).json({
      status: 'success',
      message: 'Profile updated successfully',
      data: { user: userWithoutPassword },
    });
  } catch (error) {
    next(error);
  }
};
