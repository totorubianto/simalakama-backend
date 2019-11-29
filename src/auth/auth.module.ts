import { Module,forwardRef, Injectable } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthSchema } from './schema/auth.schema';

const passportModule = PassportModule.register({ defaultStrategy: 'jwt', session: false });
@Injectable()
@Module({
  imports: [
    forwardRef(() => UsersModule),
    passportModule,
    MongooseModule.forFeature([{ name: 'Auth', schema: AuthSchema }]),
    JwtModule.register({
      secret: 'rahasia',
      signOptions: {
        expiresIn: 3600,
      },
    }),
  ],
  exports:[AuthService, passportModule],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
