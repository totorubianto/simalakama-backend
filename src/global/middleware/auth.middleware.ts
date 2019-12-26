import { NestMiddleware, Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { Model } from 'mongoose';
import { AuthService } from '../../auth/auth.service';
import { UserType } from '../enum/user-type.enum';
import { UsersService } from '../../users/users.service';
import { AdminsService } from '../../admins/admins.service'
@Injectable()
export class AuthMiddleware implements NestMiddleware {
    constructor(
        private readonly usersService: UsersService,
        private readonly authService: AuthService,
        private readonly adminsService: AdminsService
    ) {}

    async use(req: Request, res: Response, next: NextFunction) {
        const authHeaders = req.headers.authorization;
        req['useAuthMiddleware'] = true;
        if (authHeaders) {
            const str = (authHeaders as string).split(' ');
            if (str[0] !== 'Bearer' || !str[1]) throw new BadRequestException('Invalid token.');
            const token = str[1];
            const decoded: any = await this.authService.verify(token).catch((reason) => {
                const message = reason.name == "TokenExpiredError" ? "Token expired" : reason.message;
                throw new UnauthorizedException(message);
            });
            const exists = await this.authService.findByToken(token);
            if (!exists) throw new UnauthorizedException('Not authorized');
            let user;
            switch (decoded.actorModel) {
                case UserType.ADMIN:
                    user = await this.adminsService.findById(decoded._id)
                    break;
                case UserType.USER:
                    user = await this.usersService.findById(decoded._id);
                    break;
            }
            if (!user) {
                throw new UnauthorizedException('Not authorized', "middleware");
            }

            req['user'] = user;
            req['userType'] = decoded.actorModel ;

            next();
        } else {
            throw new UnauthorizedException('Not authorized');
        }
    }
}
