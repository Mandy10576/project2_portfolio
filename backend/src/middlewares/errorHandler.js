/**
 * Global Error Handling Middleware
 * --------------------------------
 * Express calls this middleware whenever `next(error)` is triggered.
 * It formats and sends standardized JSON error responses back to the client.
 */
const errorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  // Console log errors during development
  if (process.env.NODE_ENV !== 'production') {
    console.error('💥 ERROR LOG:', err);
  }

  // Handle Prisma Database Known Request Errors (e.g., duplicate unique field)
  if (err.code === 'P2002') {
    const field = err.meta?.target?.[0] || 'field';
    return res.status(400).json({
      status: 'fail',
      message: `A record with this ${field} already exists.`,
    });
  }

  // Handle Prisma Record Not Found Error
  if (err.code === 'P2025') {
    return res.status(404).json({
      status: 'fail',
      message: 'Requested record was not found in the database.',
    });
  }

  // JSON Web Token Errors
  if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({
      status: 'fail',
      message: 'Invalid authentication token. Please log in again.',
    });
  }

  if (err.name === 'TokenExpiredError') {
    return res.status(401).json({
      status: 'fail',
      message: 'Your session has expired. Please log in again.',
    });
  }

  // Send JSON response
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message || 'Internal Server Error',
    ...(process.env.NODE_ENV !== 'production' && { stack: err.stack }),
  });
};

export default errorHandler;
