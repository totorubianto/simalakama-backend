import * as mongoose from 'mongoose';
import { FriendEnum } from 'src/global/enum/friend-role.enum';
import { GlobalHelper } from 'src/global/helper/global.helper';

export const FriendSchema = new mongoose.Schema(
    {
        requester: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        recipient: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        status: {
            type: String,
            enums: FriendEnum,
        },
    },
    { timestamps: true, toObject: { virtuals: true }, toJSON: { virtuals: true } },
);
