
// JWT GUARD CODE

import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class UserGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest();
    const user = req.user; // Set by Passport/JWT strategy
    if (!user || user.role !== 'USER') throw new UnauthorizedException('User role required');
    return true;
  }
}

@Injectable()
export class CreatorGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest();
    const user = req.user;
    if (!user || user.role !== 'CREATOR') throw new UnauthorizedException('Creator access required');
    return true;
  }
}

@Injectable()
export class AdminGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest();
    const user = req.user;
    if (!user || (user.role !== 'ADMIN' && user.role !== 'SUPER_ADMIN')) {
        throw new UnauthorizedException('Admin privileges required');
    }
    return true;
  }
}
