import { Document } from 'mongoose';
export interface Friend extends Document {
    readonly requester: string;
    readonly recipient: string;
    readonly status: string;
    readonly createdAt: string;
    readonly updatedAt: string;
}
