import { Document } from 'mongoose';

export interface ClientDevice extends Document {
    readonly userAgent: string;
    readonly ip: string;
    readonly deviceToken?: string;
}
