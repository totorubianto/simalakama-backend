import { Document } from 'mongoose';

export interface Admin extends Document {
    readonly firstName: string;
    readonly lastName: string;
    readonly email: string;
    readonly phoneNumber: string;
    readonly password: string;
    readonly pin: string;
    readonly dateOfBirth: Date;
    readonly balance: {
        primary: number;
        point: number;
    };
    readonly role: string;
    readonly status: {
        suspended: boolean;
        emailVerifiedAt: Date;
        phoneNumberVerifiedAt: Date;
    };
    readonly createdAt: Date;
    readonly updatedAt: Date;
}
