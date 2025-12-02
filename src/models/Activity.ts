import mongoose, { Schema, Document } from 'mongoose';

export interface IActivity extends Document {
    type: 'post_created' | 'user_followed' | 'post_liked';
    actor: mongoose.Types.ObjectId;
    targetUser?: mongoose.Types.ObjectId;
    targetPost?: mongoose.Types.ObjectId;
}

const ActivitySchema: Schema = new Schema(
    {
        type: {
            type: String,
            enum: ['post_created', 'user_followed', 'post_liked'],
            required: true,
        },
        actor: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        targetUser: { type: Schema.Types.ObjectId, ref: 'User' },
        targetPost: { type: Schema.Types.ObjectId, ref: 'Post' },
    },
    { timestamps: true }
);

export default mongoose.model<IActivity>('Activity', ActivitySchema);
