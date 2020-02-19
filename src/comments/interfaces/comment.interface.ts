import { Document } from 'mongoose';

export interface IComment extends Document {
    readonly comment: string;
    readonly commentRef: string;
    readonly commentRefModel: string;
    readonly actor: string;
    readonly actorModel: string;
    readonly createdAt: Date;
    readonly updatedAt: Date;
}
