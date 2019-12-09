import { Module,forwardRef, Injectable } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthSchema } from './schema/auth.schema';

const passportModule = PassportModule.register({ defaultStrategy: 'jwt', session: false });
@Injectable()
@Module({
  imports: [
    passportModule,
    MongooseModule.forFeature([{ name: 'Auth', schema: AuthSchema }]),
    JwtModule.register({ secret: "rahasia"}),
  ],
  exports:[AuthService, passportModule],
  providers: [AuthService],
})
export class AuthModule {}
