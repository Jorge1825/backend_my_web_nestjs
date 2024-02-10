import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { RoleUser } from '../../common/enums/roles.enum';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.getAllAndOverride<RoleUser[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!roles) {
      return true;
    }

    const { user } = context.switchToHttp().getRequest();
    if (
      roles.includes(RoleUser.USER) &&
      (user.role === RoleUser.ADMIN || user.role === RoleUser.SUPER)
    ) {
      return true;
    }

    if(roles.includes(RoleUser.ADMIN) && user.role === RoleUser.SUPER){
      return true;
    }

    return roles.includes(user.role);
  }
}
