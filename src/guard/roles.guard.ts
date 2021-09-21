import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpStatus,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from 'src/decorator/roles.decorator';
import { Role } from 'src/enum/role.enum';
import { ErrorResult } from 'src/helper/result/errorResult';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    //requeste middleware da userı setlemiştik burada kullanalım
    if (requiredRoles.some((role) => request.user.rol?.includes(role))) {
      return true;
    } else {
      const response = context.switchToHttp().getResponse();
      return response
        .status(HttpStatus.FORBIDDEN)
        .json(new ErrorResult('PermissionError', 'Unauthorized request'));
    }
  }
}
