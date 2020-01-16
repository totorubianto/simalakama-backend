import { Injectable, BadRequestException, Request } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Verification } from './interfaces/verification.interface';
import { CreateVerificationDto } from './dto/create-verification.dto';
import * as moment from 'moment';
@Injectable()
export class VerificationService {
    private expireMinutes = 5;
    constructor(@InjectModel('Verification') private verificationModel: Model<Verification>) {}

    //create service
    async create(createVerificationDto: CreateVerificationDto): Promise<Verification> {
        let createdUser = new this.verificationModel({
            email: createVerificationDto.email,
            name: createVerificationDto.name,
            token: createVerificationDto.token,
            description: createVerificationDto.description,
            expiredAt: moment().add(this.expireMinutes, 'm'),
        });
        return await createdUser.save();
    }

    async verify(token): Promise<Verification> {
        const verify = await this.verificationModel.findOne({ token: token });
        if (!verify) throw new BadRequestException('tidak ditemukan request ganti password');
        if (verify.date && verify.date.exp.getTime() < Date.now())
            throw new BadRequestException('Forgot password telah kedaluarsa');
        return verify;
    }

    async clearExpired() {
        await this.verificationModel.deleteMany({
            expiredAt: { $lte: new Date() },
        });
        return true;
    }

    async get(query) {
        const verify = this.verificationModel.find(query);
        if (verify.length === 0) throw new BadRequestException('Tidak ditemukan data verification');
        return verify;
    }
}
