import { Document } from 'mongoose';
export interface Post extends Document {
    readonly content: string;
    readonly images: any[];
    readonly actor: any;
    readonly actorModel: string;
    readonly createdAt: string;
    readonly updatedAt: string;
}
