import { Document } from 'mongoose';

export interface IFile extends Document {
    readonly name: string;
    readonly key: string;
    readonly description: string;
    readonly type: string;
    readonly createdAt: Date;
    readonly updatedAt: Date;
}
