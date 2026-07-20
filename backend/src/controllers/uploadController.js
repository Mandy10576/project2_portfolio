/**
 * Upload Controller
 * -----------------
 * Handles file uploads and file deletion for project images.
 */
import fs from 'fs';
import path from 'path';
import AppError from '../utils/appError.js';

/**
 * @route   POST /api/upload
 * @desc    Upload an image file
 * @access  Private (Admin)
 */
export const uploadImage = (req, res, next) => {
  try {
    if (!req.file) {
      return next(new AppError('Please select an image file to upload.', 400));
    }

    // Construct accessible image URL path
    const fileUrl = `/uploads/${req.file.filename}`;

    res.status(200).json({
      status: 'success',
      message: 'Image uploaded successfully',
      data: {
        filename: req.file.filename,
        path: fileUrl,
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @route   DELETE /api/upload/:filename
 * @desc    Delete an uploaded image file
 * @access  Private (Admin)
 */
export const deleteImage = (req, res, next) => {
  try {
    const { filename } = req.params;

    if (!filename) {
      return next(new AppError('Filename parameter is required.', 400));
    }

    // Sanitize filename to prevent directory traversal
    const safeFilename = path.basename(filename);
    const filePath = path.join(process.cwd(), 'uploads', safeFilename);

    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      return res.status(200).json({
        status: 'success',
        message: 'Image deleted successfully',
      });
    } else {
      return res.status(404).json({
        status: 'fail',
        message: 'File not found on server',
      });
    }
  } catch (error) {
    next(error);
  }
};
