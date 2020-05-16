import { Document } from 'mongoose';
export interface Message extends Document {
    readonly requester: any;
    readonly recipient: any;
    readonly message: string;
    readonly createdAt: string;
    readonly updatedAt: string;
}
