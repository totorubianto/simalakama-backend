import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';

@Injectable()
export class UserTypesGuard implements CanActivate {
    constructor(private readonly reflector: Reflector) {}

    canActivate(context: ExecutionContext): boolean {
        const request = context.switchToHttp().getRequest();
        if (!request.useAuthMiddleware) return true;

        const userTypes = this.reflector.get<string[]>(
            'userTypes',
            context.getHandler(),
        );
        if (!userTypes) return false;

        const userType = request.userType;
        const hasAccess = () => userTypes.includes(userType);

        return userType && hasAccess();
    }
}