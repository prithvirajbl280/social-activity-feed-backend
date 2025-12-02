import express from 'express';
import { createPost, deletePost, likePost } from '../controllers/postController';
import { protect } from '../middlewares/authMiddleware';

const router = express.Router();

router.post('/', protect, createPost);
router.delete('/:id', protect, deletePost);
router.put('/:id/like', protect, likePost);

export default router;
