import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  UsePipes,
  UseInterceptors,
  UseFilters,
  UploadedFile,
  ValidationPipe,
  Param,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from '../global/decorator/guard.decorator';
import { RolesGuard } from '../global/guard/user.guard';
import { UserCustom } from '../global/decorator/userLogged.decorator';
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
@Controller('users')
@UsePipes(ValidationPipe)
@UseFilters(HttpExceptionFilter)
@UseInterceptors(TransformInterceptor)
@UseGuards(RolesGuard)
export class UsersController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
    private verificationService: VerificationService,
  ) {}

  // @Register
  @Post('register')
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.usersService.create(createUserDto);
  }
  // @Login
  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto) {
    return await this.usersService.login(loginUserDto);
  }

  // @uUpdate Profile
  @Post('update')
  @UseGuards(AuthGuard())
  async update(@Body() updateUserDto: UpdateUserDto, @UserCustom() user: any) {
    return await this.usersService.updateProfile(updateUserDto, user);
  }

  // @findAll
  @Get()
  findAll(): Promise<any[]> {
    return this.usersService.findAll(null);
  }

  // @me
  @Get('me')
  @UseGuards(AuthGuard())
  me(@UserCustom() user: any): Promise<any[]> {
    return this.usersService.findById(user.actor);
  }

  // Request Forgot Password
  @Post('request-forgot-password/')
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
  forgotPassword(
    @Param('token') token: string,
    @Body() updateForgotPasswordUserDto: UpdateForgotPasswordUserDto,
  ): Promise<any> {
    return this.usersService.forgotPassword(updateForgotPasswordUserDto, token);
  }

  // uploadAvatar
  @Post('upload-avatar')
  @UseGuards(AuthGuard())
  @Roles('admin', 'user')
  @UseInterceptors(
    FileInterceptor('avatar', {
      storage: diskStorage({
        destination: './public/avatar',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  async uploadedFile(@UploadedFile() file, @UserCustom() user: any) {
    return await this.usersService.uploadAvatar(file, user);
  }
}
