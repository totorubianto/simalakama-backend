import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Admin } from './interfaces/admin.interface';
import { CreateAdminDto } from './dto/create-admin.dto';
import { LoginAdminDto } from './dto/login-admin.dto';
import * as bcrypt from 'bcrypt'
import { UserType } from '../global/enum'
import { AuthService } from '../auth/auth.service'
@Injectable()
export class AdminsService {
    constructor(
        @InjectModel('Admin') private readonly adminModel: Model<Admin>,
        private readonly authService: AuthService,
    ){}
    async createOrUpdate(query, obj: CreateAdminDto) {
        let admin = await this.adminModel.findOne(query).exec();
        if (!admin) {
            admin = new this.adminModel(obj);
        } else {
            Object.assign(admin, obj);
        }

        return await admin.save();
    }
    
    async findById(id:string){
        return await this.adminModel.findById(id)
    }

    async login(data: LoginAdminDto) {
        let user = await this.adminModel.findOne({ email: data.email }).exec();
        if (!user) throw new BadRequestException('Email not found!');
        let pass = await bcrypt.compare(data.password, user.password);
        if (!pass) throw new BadRequestException('Wrong password')
        let payload = {
          _id: user._id,
          actor: user._id,
          actorModel: UserType.ADMIN,
        };
        const res = await this.authService.login(payload);
        return [res, user];
      }
}
