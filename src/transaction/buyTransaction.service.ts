import { Model } from 'mongoose';
import { Injectable, HttpException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Transaction } from './interfaces/transaction.interface';

@Injectable()
export class BuyService {
  constructor(@InjectModel('Buy') private buyTransactionModel: Model<any>) {}

  async findAll(): Model<Transaction> {
    return [
      {
        _id: 12312312,
        name: 'asdas',
      },
      {
        _id: 12312312,
        name: 'asdas',
      },
    ];
  }

  async create(data: any, user: any): Model<Transaction> {
    const session = await this.buyTransactionModel.startSession();
    session.startTransaction();
    try {
      const result = [];
      await session.commitTransaction();
      return result;
    } catch (error) {
      await session.abortTransaction();
      throw new HttpException(error.message, error.status);
    } finally {
      session.endSession();
    }
  }
}
