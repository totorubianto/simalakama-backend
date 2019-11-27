import { Model } from 'mongoose';
import { User } from './interfaces/user.interface';
import { CreateUserDto } from './dto/create-user.dto';
export declare class UsersService {
    private userModel;
    constructor(userModel: Model<User>);
    create(createUserDto: CreateUserDto): Promise<any>;
    findOneByEmail(email: any): Model<User>;
    findById(id: string): Model<User>;
    findAll(): Model<User>;
    updateProfile(data: any, user: any): Model<User>;
    uploadAvatar(data: any, user: any): Model<User>;
}
