import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UseFilters,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import * as JWT from 'jwt-decode';
import { HttpExceptionFilter } from '../filter/http-exception.filter';
@Injectable()
@UseFilters(HttpExceptionFilter)
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());

    if (!roles) {
      return true;
    }
    const req = context.switchToHttp().getRequest();
    if (!req.headers['authorization']) {
      return false;
    }
    const user = JWT(req.headers['authorization']);

    return roles.some(role => role === user.role);
  }
}
