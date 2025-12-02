import { Request, Response } from 'express';
import mongoose from 'mongoose';
import Post from '../models/Post';
import User, { IUser } from '../models/User';
import { createActivity } from '../utils/activityUtils';

interface AuthRequest extends Request {
    user?: IUser;
}

// @desc    Create a post
// @route   POST /api/posts
// @access  Private
export const createPost = async (req: AuthRequest, res: Response) => {
    const { content } = req.body;

    if (!content) {
        res.status(400).json({ message: 'Content is required' });
        return;
    }

    try {
        const post = await Post.create({
            content,
            author: req.user?._id,
        });

        await createActivity('post_created', req.user?._id as mongoose.Types.ObjectId, undefined, post._id as mongoose.Types.ObjectId);

        res.status(201).json(post);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Delete a post
// @route   DELETE /api/posts/:id
// @access  Private
export const deletePost = async (req: AuthRequest, res: Response) => {
    try {
        const post = await Post.findById(req.params.id);

        if (!post) {
            res.status(404).json({ message: 'Post not found' });
            return;
        }

        // Check if user is author or admin/owner
        if (
            post.author.toString() !== req.user?._id.toString() &&
            req.user?.role !== 'admin' &&
            req.user?.role !== 'owner'
        ) {
            res.status(401).json({ message: 'Not authorized' });
            return;
        }

        await post.deleteOne();
        res.json({ message: 'Post removed' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Like/Unlike a post
// @route   PUT /api/posts/:id/like
// @access  Private
export const likePost = async (req: AuthRequest, res: Response) => {
    try {
        const post = await Post.findById(req.params.id);

        if (!post) {
            res.status(404).json({ message: 'Post not found' });
            return;
        }

        if (post.likes.includes(req.user?._id as mongoose.Types.ObjectId)) {
            await post.updateOne({ $pull: { likes: req.user?._id } });
            res.json({ message: 'Post unliked' });
        } else {
            await post.updateOne({ $push: { likes: req.user?._id } });

            await createActivity('post_liked', req.user?._id as mongoose.Types.ObjectId, undefined, post._id as mongoose.Types.ObjectId);

            res.json({ message: 'Post liked' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};
