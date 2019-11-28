import { Injectable } from '@nestjs/common';
import { MailerService } from '@nest-modules/mailer';

@Injectable()
export class MailService {
    constructor(private readonly mailerService: MailerService) {}
}
