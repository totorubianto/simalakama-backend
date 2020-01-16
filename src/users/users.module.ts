import { Module, MiddlewareConsumer, forwardRef, Injectable } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UserSchema } from './schema/user.schema';
import { AuthModule } from '../auth/auth.module';
import { VerificationModule } from '../verification/verification.module';
@Injectable()
@Module({
    imports: [
        VerificationModule,
        AuthModule,
        MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    ],
    exports: [UsersService],
    controllers: [UsersController],
    providers: [UsersService],
})
export class UsersModule {}
