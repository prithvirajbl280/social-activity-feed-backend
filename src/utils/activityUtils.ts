import Activity from '../models/Activity';
import mongoose from 'mongoose';

export const createActivity = async (
    type: 'post_created' | 'user_followed' | 'post_liked',
    actor: mongoose.Types.ObjectId,
    targetUser?: mongoose.Types.ObjectId,
    targetPost?: mongoose.Types.ObjectId
) => {
    try {
        await Activity.create({
            type,
            actor,
            targetUser,
            targetPost,
        });
    } catch (error) {
        console.error('Error creating activity:', error);
    }
};
