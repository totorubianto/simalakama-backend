import {
  Injectable,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Admin } from './interfaces/admin.interface';
import { CreateAdminDto } from './dto/create-admin.dto';
import { LoginAdminDto } from './dto/login-admin.dto';
import * as bcrypt from 'bcrypt';
import { UserType } from '../global/enum';
import { AuthService } from '../auth/auth.service';
@Injectable()
export class AdminsService {
  constructor(
    @InjectModel('Admin') private readonly adminModel: Model<Admin>,
    private readonly authService: AuthService,
  ) {}
  async createOrUpdate(query, obj: CreateAdminDto) {
    let admin = await this.adminModel.findOne(query).exec();
    if (!admin) {
      admin = new this.adminModel(obj);
    } else {
      Object.assign(admin, obj);
    }

    return await admin.save();
  }

  async findById(id: string) {
    return await this.adminModel.findById(id);
  }

  async login(data: LoginAdminDto) {
    let user = await this.adminModel.findOne({ email: data.email }).exec();
    if (!user) throw new BadRequestException('Email not found!');
    let pass = await bcrypt.compare(data.password, user.password);
    if (!pass) throw new BadRequestException('Wrong password');
    let payload = {
      _id: user._id,
      actor: user._id,
      actorModel: UserType.ADMIN,
    };
    const res = await this.authService.login(payload);
    return [res, user];
  }

  async logout(accessToken: string): Promise<boolean> {
    const logout = await this.authService.logout(accessToken);
    if (!logout)
      throw new InternalServerErrorException('Something went wrong!');
    return logout;
  }

  async list(
    skip?: number,
    limit?: number,
    sort?: string[],
    filter?: string[],
    search?: string[],
  ): Promise<[Admin[], number, number, number, string[]]> {
    const query = {};
    let filterQuery = [];
    filter.forEach((f: string) => {});
    if (filterQuery.length > 0) Object.assign(query, { $and: filterQuery });
    if (search && search.length > 0) {
      const searchQuery = [];
      for (var i = search.length - 1; i >= 0; i--) {
        const q = search[i] ? search[i].split('|') : [];
        if (q.length < 2) continue;
        const name = q[0];
        const value = q[1];
        searchQuery.push({ [name]: { $regex: '.*' + [value] + '.*' } });
      }
      Object.assign(query, { $or: searchQuery });
    }
    let cursor = this.adminModel.find(query);
    if (sort) cursor.sort({ [sort[0]]: sort[1] });
    if (skip) cursor.skip(skip);
    if (limit) cursor.limit(limit);
    const admins = await cursor.exec();
    const count = await this.adminModel.countDocuments(query);
    return [admins, skip, limit, count, filter];
  }
}
