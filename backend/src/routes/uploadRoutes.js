/**
 * Upload Routes
 * -------------
 * REST Endpoints for Uploading and Deleting Project Images.
 */
import express from 'express';
import { uploadImage, deleteImage } from '../controllers/uploadController.js';
import { upload } from '../middlewares/uploadMiddleware.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Upload image file (Requires token + single file payload 'image')
router.post('/', protect, upload.single('image'), uploadImage);

// Delete image file by filename
router.delete('/:filename', protect, deleteImage);

export default router;
