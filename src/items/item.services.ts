import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Item } from './interfaces/item.interface';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { UsersService } from '../users/users.service';

@Injectable()
export class ItemService {
  constructor(
    @InjectModel('Item') private readonly itemModel: Model<Item>,
    private readonly usersService: UsersService,
  ) {}

  // find all item services
  async findAll(): Promise<any[]> {
    try {
      const data = await this.itemModel.find().populate('user', '-balance');
      return data;
    } catch (error) {
      throw new HttpException(
        {
          data: {
            message: 'Tidak ada barang',
            errors: 'tidak ada barang',
          },
        },
        HttpStatus.NOT_FOUND,
      );
    }
  }
  // find one item services
  async findOne(id: string): Promise<Item> {
    try {
      const item = await this.itemModel
        .findOne({ _id: id })
        .populate('user', '-balance');
      if (!item)
        throw new HttpException(
          {
            data: {
              message: 'Input data failed',
              errors: {
                id: 'tidak ditemukan barang',
              },
            },
          },
          HttpStatus.NOT_FOUND,
        );
      return item;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  // create item services
  async create(item: Item, data): Promise<Item> {
    let itemData = item;
    itemData.user = data._id;
    const newItem = new this.itemModel(item);
    return await newItem.save();
  }

  // delete item service
  async delete(id: string, user: any): Promise<Item> {
    try {
      const deleteData = await this.itemModel.findOneAndRemove({
        _id: id,
        user: user._id,
      });
      if (!deleteData)
        throw new HttpException(
          {
            data: {
              message: 'Input data failed',
              errors: {
                id: 'tidak ditemukan barang di koleksi anda',
              },
            },
          },
          HttpStatus.NOT_FOUND,
        );
      return deleteData;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  // update item services
  async update(id: string, item: Item, data: any): Promise<Item> {
    try {
      const itemData = await this.itemModel
        .findOneAndUpdate(
          {
            _id: id,
            user: data._id,
          },
          item,
          { new: true },
        )
        .populate('user');

      if (!itemData)
        throw new HttpException(
          {
            data: {
              message: 'Input data failed',
              errors: {
                item: 'tidak ditemukan barang di koleksi anda',
              },
            },
          },
          HttpStatus.NOT_FOUND,
        );
      return itemData;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
}
