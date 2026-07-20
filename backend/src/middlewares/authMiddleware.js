/**
 * JWT Authentication Middleware
 * -----------------------------
 * Protects admin routes from unauthorized access.
 * 1. Checks if the HTTP header contains "Authorization: Bearer <JWT_TOKEN>"
 * 2. Verifies the token using JWT_SECRET
 * 3. Fetches the user from the database and attaches it to `req.user`
 */
import jwt from 'jsonwebtoken';
import prisma from '../config/db.js';
import AppError from '../utils/appError.js';

export const protect = async (req, res, next) => {
  try {
    let token;

    // 1. Check if token exists in Authorization Header
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return next(new AppError('You are not logged in. Please log in to gain access.', 401));
    }

    // 2. Verify Token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback_secret_key');

    // 3. Check if User still exists
    const currentUser = await prisma.user.findUnique({
      where: { id: decoded.id },
      select: {
        id: true,
        email: true,
        name: true,
        bio: true,
        avatar: true,
        githubUrl: true,
        linkedinUrl: true,
        twitterUrl: true,
        createdAt: true,
      },
    });

    if (!currentUser) {
      return next(new AppError('The user belonging to this token no longer exists.', 401));
    }

    // Grant access to protected route
    req.user = currentUser;
    next();
  } catch (error) {
    next(error);
  }
};
