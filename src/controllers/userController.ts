import { Request, Response } from 'express';
import mongoose from 'mongoose';
import User, { IUser } from '../models/User';
import { createActivity } from '../utils/activityUtils';

interface AuthRequest extends Request {
    user?: IUser;
}

// @desc    Get user profile
// @route   GET /api/users/:id
// @access  Private
export const getUserProfile = async (req: AuthRequest, res: Response) => {
    try {
        const user = await User.findById(req.params.id).select('-password');
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Follow a user
// @route   PUT /api/users/:id/follow
// @access  Private
export const followUser = async (req: AuthRequest, res: Response) => {
    if (req.user?._id.toString() === req.params.id) {
        res.status(400).json({ message: 'You cannot follow yourself' });
        return;
    }

    try {
        const userToFollow = await User.findById(req.params.id);
        const currentUser = await User.findById(req.user?._id);

        if (!userToFollow || !currentUser) {
            res.status(404).json({ message: 'User not found' });
            return;
        }

        if (!currentUser.following.includes(userToFollow._id as mongoose.Types.ObjectId)) {
            await currentUser.updateOne({ $push: { following: userToFollow._id } });
            await userToFollow.updateOne({ $push: { followers: currentUser._id } });

            await createActivity('user_followed', currentUser._id as mongoose.Types.ObjectId, userToFollow._id as mongoose.Types.ObjectId);

            res.status(200).json({ message: 'User followed' });
        } else {
            res.status(400).json({ message: 'You already follow this user' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Unfollow a user
// @route   PUT /api/users/:id/unfollow
// @access  Private
export const unfollowUser = async (req: AuthRequest, res: Response) => {
    if (req.user?._id.toString() === req.params.id) {
        res.status(400).json({ message: 'You cannot unfollow yourself' });
        return;
    }

    try {
        const userToUnfollow = await User.findById(req.params.id);
        const currentUser = await User.findById(req.user?._id);

        if (!userToUnfollow || !currentUser) {
            res.status(404).json({ message: 'User not found' });
            return;
        }

        if (currentUser.following.includes(userToUnfollow._id as mongoose.Types.ObjectId)) {
            await currentUser.updateOne({ $pull: { following: userToUnfollow._id } });
            await userToUnfollow.updateOne({ $pull: { followers: currentUser._id } });

            res.status(200).json({ message: 'User unfollowed' });
        } else {
            res.status(400).json({ message: 'You do not follow this user' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Block a user
// @route   PUT /api/users/:id/block
// @access  Private
export const blockUser = async (req: AuthRequest, res: Response) => {
    if (req.user?._id.toString() === req.params.id) {
        res.status(400).json({ message: 'You cannot block yourself' });
        return;
    }

    try {
        const userToBlock = await User.findById(req.params.id);
        const currentUser = await User.findById(req.user?._id);

        if (!userToBlock || !currentUser) {
            res.status(404).json({ message: 'User not found' });
            return;
        }

        if (!currentUser.blockedUsers.includes(userToBlock._id as mongoose.Types.ObjectId)) {
            await currentUser.updateOne({ $push: { blockedUsers: userToBlock._id } });

            // Optional: Unfollow if blocked
            if (currentUser.following.includes(userToBlock._id as mongoose.Types.ObjectId)) {
                await currentUser.updateOne({ $pull: { following: userToBlock._id } });
                await userToBlock.updateOne({ $pull: { followers: currentUser._id } });
            }

            res.status(200).json({ message: 'User blocked' });
        } else {
            res.status(400).json({ message: 'You already blocked this user' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Unblock a user
// @route   PUT /api/users/:id/unblock
// @access  Private
export const unblockUser = async (req: AuthRequest, res: Response) => {
    try {
        const userToUnblock = await User.findById(req.params.id);
        const currentUser = await User.findById(req.user?._id);

        if (!userToUnblock || !currentUser) {
            res.status(404).json({ message: 'User not found' });
            return;
        }

        if (currentUser.blockedUsers.includes(userToUnblock._id as mongoose.Types.ObjectId)) {
            await currentUser.updateOne({ $pull: { blockedUsers: userToUnblock._id } });
            res.status(200).json({ message: 'User unblocked' });
        } else {
            res.status(400).json({ message: 'You have not blocked this user' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};
