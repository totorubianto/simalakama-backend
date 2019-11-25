import {
  Injectable,
  UnauthorizedException,
  ExecutionContext,
} from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from '../auth.service';
import { PassportStrategy } from '@nestjs/passport';
import { JwtPayload } from '../interfaces/jwt-payload.interface';
import { Request, Response } from 'express';
import { async } from 'rxjs/internal/scheduler/async';
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super(
      {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: 'rahasia',
        passReqToCallback: true,
      },
      async (req, payload, next) => await this.verify(req, payload, next),
    );
  }
  public async verify(req, payload, done) {
    const token = req.headers['authorization'];
    try {
      await this.authService.validateUserByJwt(payload, token);
      done(null, payload);
    } catch (error) {
      done(error, null);
      // throw new UnauthorizedException();
    }
  }
}
