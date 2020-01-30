import { Injectable, BadRequestException } from '@nestjs/common';
import { LoginUserDto } from 'src/users/dto/login-user.dto';
import { AuthService } from 'src/auth/auth.service';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserType } from 'src/global/enum';
import * as bcrypt from 'bcrypt';
import { Companies } from './interfaces/companies.interface';
import { CreateCompaniesDto } from './dto/register-companies.dto';

@Injectable()
export class CompaniesService {
    constructor(
        private readonly authService: AuthService,
        @InjectModel('Companies') private companies: Model<Companies>,
    ) {}

    async findById(id: string) {
        const company = [];
        return company;
    }

    async login(data: LoginUserDto, client: any) {
        let user = await this.companies.findOne({ email: data.email }).exec();
        if (!user) throw new BadRequestException('Email not found!');
        let pass = await bcrypt.compare(data.password, user.password);
        if (!pass) throw new BadRequestException('Wrong password');
        let payload = {
            _id: user._id,
            actor: user._id,
            actorModel: UserType.COMPANIES,
        };

        let res = await this.authService.login(payload);
        if (!data.keepLogin) res.refreshToken = '';
        return [res, user, client];
    }

    // create service
    async create(createUserDto: CreateCompaniesDto, client: any) {
        let createdUser = new this.companies(createUserDto);
        await createdUser.save();
        const login: LoginUserDto = {
            email: createUserDto.email,
            password: createUserDto.password,
            keepLogin: true,
        };
        const [loginData, user] = await this.login(login, client);
        return [loginData, createdUser, client];
    }
}
