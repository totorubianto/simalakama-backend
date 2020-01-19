import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ConfigModule } from './config/config.module';
import { HandlebarsAdapter, MailerModule } from '@nest-modules/mailer';
import { VerificationModule } from './verification/verification.module';
import { IsUniqueConstraint } from './global/validators/IsUnique';
import { DoesExistConstraint } from './global/validators/DoesExist';
import { CronService } from './cron/cron.service';
import { CronModule } from './cron/cron.module';
import { UserSchema } from './users/schema/user.schema';
import { AdminSchema } from './admins/schema/admin.schema';
import { AuthMiddleware } from './global/middleware/auth.middleware';
import { SeedModule } from './seed/seed.module';
import { SeedService } from './seed/seed.service';
import { FilesModule } from './files/files.module';
//import controller
import { UsersController } from './users/users.controller';
import { AdminsModule } from './admins/admins.module';
import { AdminsController } from './admins/admins.controller';

console.log(process.env.APP_URL);
@Module({
    imports: [
        AuthModule,
        UsersModule,
        ConfigModule,
        CronModule,
        MongooseModule.forRoot(
            `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/test?retryWrites=true&w=majority`,
            {
                useCreateIndex: true,
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useFindAndModify: false,
            },
        ),
        MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
        MongooseModule.forFeature([{ name: 'Admin', schema: AdminSchema }]),
        MailerModule.forRootAsync({
            useFactory: () => ({
                transport: {
                    host: process.env.MAIL_HOST,
                    port: Number(process.env.MAIL_PORT),
                    secure: process.env.MAIL_SECURE, // true for 465, false for other ports
                    auth: {
                        user: process.env.MAIL_USERNAME,
                        pass: process.env.MAIL_PASSWORD,
                    },
                },
                defaults: {
                    from: '"nest-modules" <modules@nestjs.com>',
                },
                template: {
                    dir: __dirname + '/../views/templates/',
                    adapter: new HandlebarsAdapter(), // or new PugAdapter()
                    options: {
                        strict: true,
                    },
                },
            }),
        }),
        VerificationModule,
        AdminsModule,
        SeedModule,
        FilesModule,
    ],
    controllers: [AppController],
    providers: [AppService, IsUniqueConstraint, DoesExistConstraint, AuthMiddleware],
})
export class AppModule {
    constructor(
        private readonly cronService: CronService,
        private readonly seedService: SeedService,
    ) {}
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(AuthMiddleware)
            .exclude(
                // users
                { path: 'users/login', method: RequestMethod.POST },
                { path: 'users/register', method: RequestMethod.POST },
                { path: 'users/find-all', method: RequestMethod.GET },
                { path: 'users/request-forgot-password', method: RequestMethod.POST },
                { path: 'users/forgot-password/:token', method: RequestMethod.POST },
                { path: 'users/verify/:token', method: RequestMethod.GET },
                //admin
                { path: 'admins/login', method: RequestMethod.POST },
                { path: 'admins/register', method: RequestMethod.POST },
                { path: 'admins/request-forgot-password', method: RequestMethod.POST },
                { path: 'admins/forgot-password/:token', method: RequestMethod.POST },
                { path: 'admins/verify/:token', method: RequestMethod.GET },
            )
            .forRoutes(UsersController, AdminsController);
    }
    async onApplicationBootstrap() {
        this.seedService.run();
        this.cronService.runTask();
    }
}
