import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UseFilters,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import * as JWT from 'jwt-decode';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles) {
      return true;
    }
    const req = context.switchToHttp().getRequest();
    if (!req.headers['authorization']) {
      throw new ForbiddenException('anda belum login');
    }
    const user = JWT(req.headers['authorization']);
    return roles.some(role => role === user.role);
  }
}
