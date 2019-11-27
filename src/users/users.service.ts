import { Model } from 'mongoose';
import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './interfaces/user.interface';
import { CreateUserDto } from './dto/create-user.dto';
import * as fs from 'fs';
import { dirname } from 'path';
import { ForgotPasswordUserDto } from './dto/forgot-password-user.dto';
import { Validator } from 'class-validator';
const validator = new Validator();

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private userModel: Model<User>) {}

  //create service
  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = await this.userModel.findOne({ email: createUserDto.email });
    if (user) throw new BadRequestException('user sudah ada');
    let createdUser = new this.userModel(createUserDto);
    return await createdUser.save();
  }

  // findall user service
  async findOneByEmail(email): Promise<User> {
    return await this.userModel.findOne({ email: email });
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

  // forgotPassword service
  async forgotPassword(
    user: Model<User>,
    forgotPassword: ForgotPasswordUserDto,
  ): Promise<any> {
    console.log(forgotPassword);
    let users: Model<User> = await this.findById(user._id);
    return { message: 'ok' };
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
