import { Request, Response } from 'express';
import Activity from '../models/Activity';
import { IUser } from '../models/User';

interface AuthRequest extends Request {
    user?: IUser;
}

// @desc    Get activity feed
// @route   GET /api/activity
// @access  Private
export const getActivityFeed = async (req: AuthRequest, res: Response) => {
    try {
        const currentUser = req.user;

        if (!currentUser) {
            res.status(401).json({ message: 'Not authorized' });
            return;
        }

        // Filter out activities where actor is in blockedUsers
        const activities = await Activity.find({
            actor: { $nin: currentUser.blockedUsers },
        })
            .populate('actor', 'username')
            .populate('targetUser', 'username')
            .populate('targetPost', 'content')
            .sort({ createdAt: -1 });

        res.json(activities);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};
