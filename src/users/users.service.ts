import { Model } from 'mongoose';
import { Injectable, HttpStatus, BadRequestException } from '@nestjs/common';
import { HttpException } from '@nestjs/common/exceptions/http.exception';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './interfaces/user.interface';
import { CreateUserDto } from './dto/create-user.dto';
import { TransferDto } from './dto/transfer.dto';
import * as fs from 'fs';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private userModel: Model<User>) {}

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
  async findById(id): Model<User> {
    return await this.userModel.findById(id);
  }

  // findall user service
  async findAll(): Model<User> {
    return await this.userModel.find();
  }

  async updateProfile(data: any, user: any): Model<User> {
    let users: Model<User> = await this.findById(user._id);

    if (data.name) users.name = data.name;
    if (data.email) users.email = data.email;
    if (data.password) users.password = data.password;

    return await users.save();
  }
  // upload user avatar service
  async uploadAvatar(data: any, user: any): Model<User> {
    if (!data) throw new BadRequestException('harap masukan file');
    const deleteImg = await this.userModel.findById(user._id);
    if (deleteImg.avatar) {
      const pathDelete = './upload/avatar/' + deleteImg.avatar;
      fs.unlinkSync(pathDelete);
    }
    const userData = await this.userModel.findByIdAndUpdate(
      user._id,
      { avatar: data.filename },
      {
        new: true,
      },
    );

    if (!userData) throw new BadRequestException('upload file gagal');
    return userData;
  }
}
