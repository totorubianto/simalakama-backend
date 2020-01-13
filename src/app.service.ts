import { Injectable } from '@nestjs/common';
import { MailerService } from '@nest-modules/mailer';
@Injectable()
export class AppService {
    constructor(private readonly mailerService: MailerService) {}
    getHello() {
        return { message: 'Hello world!' };
    }
}
