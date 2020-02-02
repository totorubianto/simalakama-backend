import {
    Controller,
    Get,
    Post,
    Body,
    UsePipes,
    UseInterceptors,
    UseFilters,
    UploadedFile,
    ValidationPipe,
    Param,
    Request,
    Headers,
    UploadedFiles,
    Query,
    HttpCode,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { UserTypes } from '../global/decorator/userTypes';
import { TransformInterceptor } from '../global/interceptor/transform.interceptor';
import { HttpExceptionFilter } from '../global/filter/http-exception.filter';
import { FileInterceptor, AnyFilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { LoginUserDto } from './dto/login-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { editFileName, imageFileFilter } from '../global/filter/img-upload.filter';
import { AuthService } from '../auth/auth.service';
import { UpdateForgotPasswordUserDto } from './dto/update-forgot-password.dto';
import { ForgotPasswordUserDto } from './dto/forgot-password-user.dto';
import { VerificationService } from '../verification/verification.service';
import { User } from '../global/decorator/user';
import { ClientDevice } from '../global/interfaces/client-devices.interface';
import { UserType } from '../global/enum';
import { OParseIntPipe } from '../global/pipes/o-parse-int.pipe';
import { ParseSortPipe } from '../global/pipes/parse-sort.pipe';
import { UpdatePasswordUserDto } from './dto/update-password';

@Controller('users')
@UsePipes(ValidationPipe)
@UseFilters(HttpExceptionFilter)
@UseInterceptors(TransformInterceptor)
export class UsersController {
    constructor(
        private usersService: UsersService,
        private authService: AuthService,
        private verificationService: VerificationService,
    ) {}

    // @Register
    @Post('register')
    async create(
        @Body() createUserDto: CreateUserDto,
        @Headers('user-agent') userAgent,
        @Headers('x-device') device,
        @Headers('x-device-token') deviceToken,
        @Request() req,
    ) {
        const clientData: ClientDevice = {
            userAgent: userAgent,
            ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress,
            deviceToken: deviceToken,
        };
        const [register, user, client] = await this.usersService.create(createUserDto, clientData);
        return { register, user, client };
    }
    // @Login
    @Post('login')
    async login(
        @Body() loginUserDto: LoginUserDto,
        @Headers('user-agent') userAgent,
        @Headers('x-device') device,
        @Headers('x-device-token') deviceToken,
        @Request() req,
    ) {
        const clientData: ClientDevice = {
            userAgent: userAgent,
            ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress,
            deviceToken: deviceToken,
        };

        const [login, user, client] = await this.usersService.login(loginUserDto, clientData);
        return { login, user, client };
    }

    // @uUpdate Profile
    @Post('update')
    async update(@Body() updateUserDto: UpdateUserDto, @User() data: any) {
        const user = await this.usersService.updateProfile(updateUserDto, data);
        return { user };
    }

    // @uUpdate Profile
    @Post('update-password')
    async updatePassword(@Body() updateUserDto: UpdatePasswordUserDto, @User() data: any) {
        const user = await this.usersService.updatePassword(updateUserDto, data);
        return { user };
    }

    //logout
    @UserTypes(UserType.USER)
    @HttpCode(200)
    @Post('logout')
    async logout(@Request() req) {
        const token = req.headers.authorization.split(' ')[1];
        this.usersService.logout(token);
        return {};
    }

    //logout
    @UserTypes(UserType.USER)
    @HttpCode(200)
    @Post('logout-all')
    async logoutAll(@User() userData: any) {
        this.usersService.logoutAll(userData);
        return {};
    }

    // @findAll
    @UserTypes(UserType.USER)
    @Get('find-all')
    async findAll(@User() user) {
        const users = await this.usersService.findAll(null, user);
        return { users };
    }

    // @me
    @Get('me')
    me(@User() user: any): Promise<any[]> {
        return this.usersService.findById(user._id);
    }

    // Request Forgot Password
    @Post('request-forgot-password')
    async requestForgotPassword(
        @Body() forgotPasswordUserDto: ForgotPasswordUserDto,
    ): Promise<any> {
        const req = await this.usersService.requestForgotPassword(forgotPasswordUserDto);
        return { message: 'ok' };
    }

    // Verify Password
    @Get('verify/:token')
    async verifyForgotPassword(@Param('token') token: string): Promise<any> {
        const verify = await this.verificationService.verify(token);
        return { message: 'ok' };
    }

    // Forgot Password
    @Post('forgot-password/:token')
    async forgotPassword(
        @Param('token') token: string,
        @Body() updateForgotPasswordUserDto: UpdateForgotPasswordUserDto,
    ) {
        const user = await this.usersService.forgotPassword(updateForgotPasswordUserDto, token);
        return { user };
    }

    // uploadAvatar
    @Post('upload-avatar')
    @UseInterceptors(AnyFilesInterceptor())
    async uploadedFile(@UploadedFiles() files = [], @User() userData: any) {
        const avatar = files.find(f => f.fieldname == 'avatar');
        const user = await this.usersService.uploadAvatar(avatar, userData);
        return { user };
    }

    @UserTypes(UserType.ADMIN)
    @Get('list')
    async list(
        @User() user,
        @Query('skip', new OParseIntPipe()) qSkip,
        @Query('limit', new OParseIntPipe()) qLimit,
        @Query('sort', new ParseSortPipe()) qSort,
        @Query('filter') qFilter,
    ) {
        const [users, skip, limit, count, filter] = await this.usersService.list(
            qSkip,
            qLimit,
            qSort,
            qFilter,
        );
        return { users, skip, limit, count, filter };
    }
}
