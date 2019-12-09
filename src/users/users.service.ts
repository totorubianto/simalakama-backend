import { Model } from 'mongoose';
import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './interfaces/user.interface';
import { CreateUserDto } from './dto/create-user.dto';
import * as fs from 'fs';
import { ForgotPasswordUserDto } from './dto/forgot-password-user.dto';
import { Validator } from 'class-validator';
import { MailerService } from '@nest-modules/mailer';
import * as uuidv1 from 'uuid/v1';
import { VerificationService } from '../verification/verification.service';
import { Verification } from '../verification/interfaces/verification.interface';
import { UpdateForgotPasswordUserDto } from './dto/update-forgot-password.dto';
import { AuthService } from '../auth/auth.service'
import { LoginUserDto } from './dto/login-user.dto';
import { UserType } from '../global/enum/user.type'
const validator = new Validator();

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('User') private userModel: Model<User>,
    private readonly mailerService: MailerService,
    private readonly verificationService: VerificationService,
    private readonly authService: AuthService,
  ) {}

  //create service
  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = await this.userModel.findOne({ email: createUserDto.email });
    if (user) throw new BadRequestException('user sudah ada');
    let createdUser = new this.userModel(createUserDto);
    return await createdUser.save();
  }

  //login
  async login(data : LoginUserDto){
    let user = await this.userModel.findOne({ email: data.email }).exec();
    if (!user) throw new BadRequestException("Invalid Credentials!");
    let payload = {
      _id: user._id,
      actor : user._id,
      actorModel : UserType.USER,
    }
    const res = await this.authService.login(payload);
    return res
  }

  // findall user service
  async findOne(query): Promise<User> {
    return await this.userModel.findOne(query);
  }

  // findall user service
  async findById(id: string): Model<User> {
    return await this.userModel.findById(id);
  }

  // findall user service
  async findAll(query: any): Promise<User[]> {
    return await this.userModel.find(query);
  }

  // updateProfile service
  async updateProfile(data: any, user: any): Promise<User> {
    let users: Model<User> = await this.findById(user._id);
    if (data.email && data.email === users.email)
      throw new BadRequestException(
        'anda tidak melakukan perubahan apa pun pada email',
      );
    if (data.name) users.name = data.name;
    if (data.email) {
      users.email = data.email;
      let email = { email: users.email };
      let usersAll: Model<User> = await this.findAll(email);
      if (usersAll.length > 0)
        throw new BadRequestException('email sudah digunakan');
    }
    if (data.password) {
      if (!validator.minLength(data.password, 6))
        throw new BadRequestException('password');
      users.password = data.password;
    }
    return await users.save();
  }

  // requestForgotPassword service
  async requestForgotPassword(
    forgotPassword: ForgotPasswordUserDto,
  ): Promise<any> {
    const email = { email: forgotPassword.email };
    const user: Model<User> = await this.findOne(email);
    const data = {
      email: forgotPassword.email,
      name: 'FORGOT_PASSWORD',
      description: 'FORGOT PASSWORD',
      token: uuidv1(),
    };
    const verification = await this.verificationService.create(data);
    console.log(verification.token);
    await this.mailerService.sendMail({
      to: forgotPassword.email,
      from: 'noreply@nestjs.com',
      subject: 'Simalakama Forgot Password ✔',
      template: 'forgotPassword.html', // The `.pug` or `.hbs` extension is appended automatically.
      context: {
        // Data to be sent to template engine.
        to: user.name,
        token: uuidv1(),
        address: `${process.env.APP_URL}/users/verify/${verification.token}`,
      },
    });
    return { message: 'ok' };
  }

  // forgotPassword Service
  async forgotPassword(
    forgotPasswordUserDto: UpdateForgotPasswordUserDto,
    token: string,
  ): Promise<User> {
    let verify: Model<Verification> = await this.verificationService.verify(
      token,
    );
    const email = { email: verify.email };
    let user: Model<User> = await this.userModel.findOne(email);
    user.password = forgotPasswordUserDto.newPassword;
    await user.save();
    return user;
  }

  // upload user avatar service
  async uploadAvatar(data: any, user: any): Promise<User> {
    if (!data) throw new BadRequestException('harap masukan file');
    const deleteImg = await this.userModel.findById(user._id);
    const pathDelete = './public/avatar/' + deleteImg.avatar;
    if (fs.existsSync(pathDelete)) fs.unlinkSync(pathDelete);
    const userData = await this.userModel.findByIdAndUpdate(
      user._id,
      { avatar: data.filename },
      { new: true },
    );
    if (!userData) throw new BadRequestException('upload file gagal');
    return userData;
  }
}
