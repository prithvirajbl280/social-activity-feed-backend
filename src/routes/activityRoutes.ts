import express from 'express';
import { getActivityFeed } from '../controllers/activityController';
import { protect } from '../middlewares/authMiddleware';

const router = express.Router();

router.get('/', protect, getActivityFeed);

export default router;
