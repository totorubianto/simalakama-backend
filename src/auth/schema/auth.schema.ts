import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;
export const AuthSchema = new mongoose.Schema({
    accessToken: {
        type: String,
        required: true,
    },
    refreshToken: {
        type: String,
        required: true,
    },
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
