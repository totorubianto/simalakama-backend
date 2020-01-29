import { Controller, Post, Body, Headers, Request } from '@nestjs/common';
import { LoginUserDto } from 'src/users/dto/login-user.dto';
import { ClientDevice } from 'src/global/interfaces/client-devices.interface';
import { CompaniesService } from './companies.service';

@Controller('companies')
export class CompaniesController {
    constructor(private companiesService: CompaniesService) {}
    @Post('login')
    async login(
        @Body() loginUserDto: LoginUserDto,
        @Headers('user-agent') userAgent,
        @Headers('x-device') device,
        @Headers('x-device-token') deviceToken,
        @Request() req,
    ) {
        const clientData: ClientDevice = {
            userAgent: userAgent,
            ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress,
            deviceToken: deviceToken,
        };

        const [login, user, client] = await this.companiesService.login(loginUserDto, clientData);
        return { login, user, client };
    }
}
