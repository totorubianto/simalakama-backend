import * as mongoose from 'mongoose';
import { ScopeEnum } from '../../global/enum';

const PostSchema = new mongoose.Schema(
    {
        actor: {
            type: mongoose.Schema.Types.ObjectId,
            refPath: 'actorModel',
            required: true,
        },
        actorModel: {
            type: String,
            required: true,
            enum: ['User'],
        },
        content: { type: String },
        hashtag: [{ type: String }],
        images: [{ type: mongoose.Schema.Types.ObjectId, ref: 'File' }],
        mention: [{
            type: mongoose.Schema.Types.ObjectId,
        }],
        scope: {
            type: String,
            required: true,
            enum: ScopeEnum
        }
    },
    { timestamps: true },
);

export { PostSchema };
