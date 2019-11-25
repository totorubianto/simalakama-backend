import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
const jwt = require('jsonwebtoken');
import { Request, Response } from 'express';
// import { AuthService } from '../auth/auth.service';
var cookieParser = require('cookie-parser');
@Injectable()
export class AuthMiddleware implements NestMiddleware {
  //   constructor(private authService: AuthService) {}
  async use(req: Request, res: Response, next: Function) {
    // if (req.headers) {
    //   next();
    // } else {
    //   throw new UnauthorizedException();
    // }
    let token = req.headers['authorization'];

    if (!token) {
      throw new UnauthorizedException();
    }
    const tokenSlice = token.replace('Bearer ', '');

    try {
      await jwt.verify(tokenSlice, 'rahasia', (error, decoded) => {
        if (error) {
          throw new UnauthorizedException();
        } else {
          //   this.authService.validateToken(token);
          next();
        }
      });
    } catch (err) {
      throw new UnauthorizedException();
    }
  }
}
