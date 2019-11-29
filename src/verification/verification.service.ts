import { Injectable, BadRequestException, Request } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Verification } from './interfaces/verification.interface'
import { CreateVerificationDto } from "./dto/create-verification.dto"

@Injectable()
export class VerificationService {
    constructor(
        @InjectModel('Verification') private verificationModel: Model<Verification>
      ) {}

     //create service
    async create(createVerificationDto: CreateVerificationDto): Promise<Verification> {
        let createdUser = new this.verificationModel(createVerificationDto);
        return await createdUser.save();
    }

    async verify(token):Promise<Verification>{
        const verify = this.verificationModel.findOne({token:token})
        if(!verify) throw new BadRequestException("tidak ditemukan request ganti password")
        return verify
    }

    async get(query){
        const verify = this.verificationModel.find(query)
        if(verify.length === 0) throw new BadRequestException("Tidak ditemukan data verification")
        return verify
    }
}
