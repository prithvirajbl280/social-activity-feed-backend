import express from 'express';
import {
    getUserProfile,
    followUser,
    unfollowUser,
    blockUser,
    unblockUser,
} from '../controllers/userController';
import { protect } from '../middlewares/authMiddleware';

const router = express.Router();

router.get('/:id', protect, getUserProfile);
router.put('/:id/follow', protect, followUser);
router.put('/:id/unfollow', protect, unfollowUser);
router.put('/:id/block', protect, blockUser);
router.put('/:id/unblock', protect, unblockUser);

export default router;
