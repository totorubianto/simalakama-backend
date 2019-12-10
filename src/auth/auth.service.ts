import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from '../users/dto/login-user.dto';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import * as JWT from 'jwt-decode';
import { Auth } from './interfaces/jwt.interface';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel('Auth') private readonly authModel: Model<Auth>,
    private jwtService: JwtService,
  ) {}

  // validation user by password
  async login(payload: any) {   
    const [accessToken, refreshToken] = this.generateToken(payload);
    const saveToken = {
      accessToken: accessToken,
      refreshToken: refreshToken,
      actor: payload.actor,
      actorModel: payload.actorModel
    };
    const newItem = new this.authModel(saveToken);
    const result = newItem.save();
    return result;
  }

  // find token from header and check of auth model
  async findTokenEmail(token: string): Model<Auth> {
    const tokenNotBearer = token.replace('Bearer ', '');
    const data = await this.authModel.findOne({ accessToken: tokenNotBearer });
    return data;
  }

  // validate user by jwt
  async validateUserByJwt(payload:any, accessToken: string) {
    console.log(payload)
    let auth = await this.findTokenEmail(accessToken);
    if (!auth)
      throw new UnauthorizedException('Session login anda sudah habis');
    const data = JWT(auth.accessToken);
    const expiresIn = data.exp * 1000;
    let compareDate: boolean = expiresIn > Date.now();
    console.log(true)
    if (!compareDate) {
      await this.authModel.deleteOne(accessToken);
      throw new UnauthorizedException('Session login anda sudah habis');
    }
    const payloadData = this.getPayloadFromToken(accessToken);
    const [nAccessToken, nRefreshToken] = this.generateToken(payloadData);
    auth.accessToken = nAccessToken;
    auth.refreshToken = nRefreshToken;
    await auth.save();
    return auth;
  }

  async verify(token: string) {
      return this.jwtService.verify(token);
  }

  async findByToken(accessToken: string): Promise<Model<Auth>> {
      return this.authModel.findOne({ accessToken: accessToken }).exec();
  }

  getPayloadFromToken(token: string): any {
    const tokenNotBearer = token.replace('Bearer ', '');
    let exceptions = ['iat', 'exp'];
    let payload = this.jwtService.decode(tokenNotBearer);
    if (typeof payload == 'object') {
        for (var i = exceptions.length - 1; i >= 0; i--) {
            delete payload[exceptions[i]];
        }
    }
    return payload;
}

  // create jwt payload
  generateToken(payload: any = {}): [string, string] {
    console.log(process.env.JWT_TTL)
    const accessToken = this.jwtService.sign(payload, { expiresIn: 60*60*60 });
    const refreshToken = this.jwtService.sign({}, { expiresIn: process.env.JWT_REFRESH_TTL });
    return [accessToken, refreshToken];
  }
}
