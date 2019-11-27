import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { LoginUserDto } from './dto/login-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthService } from '../auth/auth.service';
export declare class UsersController {
    private usersService;
    private authService;
    constructor(usersService: UsersService, authService: AuthService);
    create(createUserDto: CreateUserDto): Promise<any>;
    login(loginUserDto: LoginUserDto): Promise<any>;
    update(updateUserDto: UpdateUserDto, user: any): Promise<any>;
    findAll(): Promise<any[]>;
    me(user: any): Promise<any[]>;
    uploadedFile(file: any, user: any): Promise<any>;
}
