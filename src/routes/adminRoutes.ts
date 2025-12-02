import express from 'express';
import { deleteUser, updateUserRole } from '../controllers/adminController';
import { protect, authorize } from '../middlewares/authMiddleware';

const router = express.Router();

router.delete('/users/:id', protect, authorize('admin', 'owner'), deleteUser);
router.put('/users/:id/role', protect, authorize('owner'), updateUserRole);

export default router;
