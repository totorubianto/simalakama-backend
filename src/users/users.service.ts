import { Model } from 'mongoose';
import { Injectable, HttpStatus, BadRequestException } from '@nestjs/common';
import { HttpException } from '@nestjs/common/exceptions/http.exception';
import { InjectModel } from '@nestjs/mongoose';
import { Transaction } from './interfaces/transaction.interface';
import { User } from './interfaces/user.interface';
import { CreateUserDto } from './dto/create-user.dto';
import { TransferDto } from './dto/transfer.dto';
import * as fs from 'fs';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('User') private userModel: Model<User>,
    @InjectModel('Transfer') private transaction: Model<Transaction>,
  ) {}

  async create(createUserDto: CreateUserDto) {

      const user = await this.userModel.findOne({ email: createUserDto.email });
      if (user) throw new BadRequestException('user sudah ada')
      let createdUser = new this.userModel(createUserDto);
      return await createdUser.save();
  }

  // findall user service
  async findOneByEmail(email): Model<User> {
    return await this.userModel.findOne({ email: email });
  }

  // findall user service
  async findAll(): Model<User> {
    return await this.userModel.find();
  }

  // upload user avatar service
  async uploadAvatar(data: any, user: any): Model<User> {
    if(!data) throw new BadRequestException("harap masukan file")
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

    if (!userData) throw new BadRequestException('upload file gagal')
    return userData;
  }

  // transfer user service
  async transfer(data: TransferDto, user: any): Model<User> {
    const session = await this.userModel.startSession();
    session.startTransaction();
    try {
      if (data.to === user.email) throw new BadRequestException('anda tidak bisa transfer ke diri sendiri ')
      const sender = await this.userModel
        .findOne({ email: user.email })
        .session(session);

      const opts = { session };

      sender.balance = sender.balance - data.amount;
      if (sender.balance < data.amount) throw new BadRequestException('saldo yang anda kurang')
      await sender.save();
      const receiver = await this.userModel
        .findOne({
          email: data.to,
        })
        .session(session);
      if (!receiver) throw new BadRequestException('tidak ditemukan alamat penerima');
      receiver.balance = receiver.balance + data.amount;
      await receiver.save();
      const transaction = await this.transaction({
        date: Date.now(),
        to: receiver._id,
        total: data.amount,
        from: user._id,
      }).save(opts);

      const result = await this.transaction
        .findById(transaction._id)
        .populate([
          {
            path: 'to',
            populate: { path: 'user' },
            select: '_id name email',
          },
          {
            path: 'from',
            populate: { path: 'user' },
          },
        ])
        .session(session);

      await session.commitTransaction();
      return result;
    } catch (error) {
      await session.abortTransaction();
      throw new BadRequestException(error.message);
    } finally {
      session.endSession();
    }
  }
}
