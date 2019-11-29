import { Injectable } from '@nestjs/common';
import { MailerService } from '@nest-modules/mailer'
@Injectable()
export class AppService {
  constructor(private readonly mailerService: MailerService){}
  getHello() {
    this
      .mailerService
      .sendMail({
        to: 'toto.rubianto.17@gmail.com',
        from: 'noreply@nestjs.com',
        subject: 'Testing Nest Mailermodule with template ✔',
        template: 'welcome', // The `.pug` or `.hbs` extension is appended automatically.
        context: {  // Data to be sent to template engine.
          code: 'cf1a3f828287',
          username: 'john doe',
        },
      })
      .then(() => {})
      .catch(() => {});
    return { message: 'Hello world!' };
  }
}
