import { Request, Response } from 'express';
import User, { IUser } from '../models/User';
import Post from '../models/Post';

interface AuthRequest extends Request {
    user?: IUser;
}

// @desc    Delete user
// @route   DELETE /api/admin/users/:id
// @access  Private/Admin/Owner
export const deleteUser = async (req: AuthRequest, res: Response) => {
    try {
        const user = await User.findById(req.params.id);

        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }

        // Owner cannot be deleted by Admin
        if (user.role === 'owner' && req.user?.role !== 'owner') {
            res.status(403).json({ message: 'Not authorized to delete owner' });
            return;
        }

        await user.deleteOne();
        // Also delete user's posts
        await Post.deleteMany({ author: user._id });

        res.json({ message: 'User removed' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Update user role (Promote/Demote)
// @route   PUT /api/admin/users/:id/role
// @access  Private/Owner
export const updateUserRole = async (req: AuthRequest, res: Response) => {
    const { role } = req.body;

    if (!role || !['user', 'admin'].includes(role)) {
        res.status(400).json({ message: 'Invalid role' });
        return;
    }

    try {
        const user = await User.findById(req.params.id);

        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }

        user.role = role;
        await user.save();

        res.json({ message: `User role updated to ${role}` });
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};
