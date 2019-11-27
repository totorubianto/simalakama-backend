import { Model } from 'mongoose';
import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './interfaces/user.interface';
import { CreateUserDto } from './dto/create-user.dto';
import * as fs from 'fs';
import { dirname } from 'path';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private userModel: Model<User>) {}

  //create service
  async create(createUserDto: CreateUserDto) {
    const user = await this.userModel.findOne({ email: createUserDto.email });
    if (user) throw new BadRequestException('user sudah ada');
    let createdUser = new this.userModel(createUserDto);
    return await createdUser.save();
  }

  // findall user service
  async findOneByEmail(email): Model<User> {
    return await this.userModel.findOne({ email: email });
  }

  // findall user service
  async findById(id: string): Model<User> {
    return await this.userModel.findById(id);
  }

  // findall user service
  async findAll(): Model<User> {
    return await this.userModel.find();
  }

  // updateProfile service
  async updateProfile(data: any, user: any): Model<User> {
    let users: Model<User> = await this.findById(user._id);
    if (data.email && data.email === users.email)
      throw new BadRequestException(
        'anda tidak melakukan perubahan apa pun pada email',
      );
    if (data.name) users.name = data.name;
    if (data.email) users.email = data.email;
    if (data.password) users.password = data.password;
    return await users.save();
  }

  async forgotPassword(user: object): Model<User> {
    console.log(user);
  }

  // upload user avatar service
  async uploadAvatar(data: any, user: any): Model<User> {
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
