import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from '../users/dto/login-user.dto';
import { UsersService } from '../users/users.service';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { Auth } from './interfaces/jwt.interface';
import { Model } from 'mongoose';
export declare class AuthService {
    private readonly authModel;
    private usersService;
    private jwtService;
    constructor(authModel: Model<Auth>, usersService: UsersService, jwtService: JwtService);
    validateUserByPassword(loginAttempt: LoginUserDto): Promise<any>;
    findTokenEmail(token: string): Model<Auth>;
    validateUserByJwt(payload: JwtPayload, token: string): Promise<{
        expiresIn: number;
        token: string;
    }>;
    createJwtPayload(user: any): {
        expiresIn: number;
        token: string;
    };
}
