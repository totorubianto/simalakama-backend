import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Admin } from './interfaces/admin.interface';
import { CreateAdminDto } from './dto/create-admin.dto';

@Injectable()
export class AdminsService {
    constructor(
        @InjectModel('Admin') private readonly adminModel: Model<Admin>,
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
}
