import { Injectable } from '@nestjs/common';
import { MailerService } from '@nest-modules/mailer';
@Injectable()
export class AppService {
    getHello() {
        return { message: 'Hello world!' };
    }
}
