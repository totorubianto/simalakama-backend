import * as mongoose from 'mongoose';

export const MessageSchema = new mongoose.Schema(
    {
        requester: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        recipient: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        message: { type: String, required: true }
    },
    { timestamps: true, toObject: { virtuals: true }, toJSON: { virtuals: true } },
);
