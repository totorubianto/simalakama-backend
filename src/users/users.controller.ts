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
  BadGatewayException
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { UserTypes } from '../global/decorator/userTypes';
import { TransformInterceptor } from '../global/interceptor/transform.interceptor';
import { HttpExceptionFilter } from '../global/filter/http-exception.filter';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { LoginUserDto } from './dto/login-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {
  editFileName,
  imageFileFilter,
} from '../global/filter/img-upload.filter';
import { AuthService } from '../auth/auth.service';
import { UpdateForgotPasswordUserDto } from './dto/update-forgot-password.dto';
import { ForgotPasswordUserDto } from './dto/forgot-password-user.dto';
import { VerificationService } from '../verification/verification.service';
import { User } from '../global/decorator/user';
import { ClientDevice } from '../global/interfaces/client-devices.interface'

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
  async create(@Body() createUserDto: CreateUserDto) {
    throw new BadGatewayException('error')
    const register = await this.usersService.create(createUserDto);
    return {register}
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
    const client: ClientDevice = {
        userAgent: userAgent,
        ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress,
        deviceToken: deviceToken, 
    };
    
     const [login, user] = await this.usersService.login(loginUserDto, client);
     return {login, user, client}
  }

  // @uUpdate Profile
  @Post('update')
  async update(@Body() updateUserDto: UpdateUserDto, @User() data: any) {
    const user = await this.usersService.updateProfile(updateUserDto, data);
    return {user}
  }

  //logout
  @Post('logout')
  async logout(@Request() user: any) {
    return await this.authService.logout(user);
  }

  //logout
  @Post('logout-all')
  async logoutAll(@User() user: any) {
    return await this.authService.logoutAll(user);
  }

  // @findAll
  @Get('find-all')
  async findAll() {
    const users = await this.usersService.findAll(null);
    return {users};
  }

  // @me
  @Get('me')
  me(@User() user: any): Promise<any[]> {
    return this.usersService.findById(user._id);
  }

  // Request Forgot Password
  @Post('request-forgot-password')
  requestForgotPassword(
    @Body() forgotPasswordUserDto: ForgotPasswordUserDto,
  ): Promise<any> {
    return this.usersService.requestForgotPassword(forgotPasswordUserDto);
  }

  // Verify Password
  @Get('verify/:token')
  verifyForgotPassword(@Param('token') token: string): Promise<any> {
    return this.verificationService.verify(token);
  }

  // Forgot Password
  @Post('forgot-password/:token')
  async forgotPassword(
    @Param('token') token: string,
    @Body() updateForgotPasswordUserDto: UpdateForgotPasswordUserDto,
  ) {
     const user = await this.usersService.forgotPassword(updateForgotPasswordUserDto, token);
     return {user}
  }

  // uploadAvatar
  @Post('upload-avatar')
  @UseInterceptors(
    FileInterceptor('avatar', {
      storage: diskStorage({
        destination: './public/avatar',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  async uploadedFile(@UploadedFile() file, @User() user: any) {
    return await this.usersService.uploadAvatar(file, user);
  }
}
