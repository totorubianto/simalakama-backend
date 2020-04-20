import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;
export const CommentSchema = new mongoose.Schema({
    comment: { type: String, required: true },
    sub: [],
    actor: {
        type: Schema.Types.ObjectId,
        required: true,
        refPath: 'actorModel',
    },
    actorModel: {
        type: String,
        required: true,
        enum: ['Admin', 'Companies', 'User'],
    },
});
