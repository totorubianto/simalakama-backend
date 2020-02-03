import * as mongoose from 'mongoose';
import { FriendEnum } from 'src/global/enum/friend-role.enum';
export const FriendSchema = new mongoose.Schema(
    {
        requester: { type: mongoose.Schema.Types.ObjectId, ref: 'Users' },
        recipient: { type: mongoose.Schema.Types.ObjectId, ref: 'Users' },
        status: {
            type: String,
            enums: FriendEnum,
        },
    },
    { timestamps: true },
);
