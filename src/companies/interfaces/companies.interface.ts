import { Document } from 'mongoose';
export interface Companies extends Document {
    readonly email: string;
    readonly name: string;
    readonly password: string;
    readonly logo: string;
    readonly cover: string;
    readonly createdAt: string;
    readonly updatedAt: string;
}
