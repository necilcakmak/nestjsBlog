import {
  ControllerEnum,
  RoleTypeConverter,
} from './../enum/controllerName.enum';
import { Permission } from './../entity/permission';
import { User } from './../entity/user';
import { FilterHelper } from './../helper/filterHelper';
import { HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Response } from 'express';
import { UserService } from 'src/services/user.service';
import { RequestModel } from './Auth.middleware';
import { ErrorResult } from 'src/helper/result/errorResult';
import { Role } from 'src/enum/role.enum';

@Injectable()
export class PermissionMiddleware implements NestMiddleware {
  constructor(private readonly userService: UserService) {}
  async use(req: RequestModel, res: Response, next: NextFunction) {
    //eger kullanici rolu admin ise full yetkidir devam et
    if (req.user.rol == Role.Admin) {
      next();
    }
    //rolu admin harici ise yetkilerine bak
    else {
      const filter: FilterHelper<User> = {
        data: { id: req.user.id, isActive: true },
        includes: ['permissions'],
      };
      const user: User = (await this.userService.getAllByFilter(filter))
        .data[0];
      const path: string[] = req.url.split('/');

      const included = user.permissions.find(
        (x) => x.permissionGroupId === Number(ControllerEnum[path[1]]),
      );
      const roleId: number = RoleTypeConverter[path[2]];

      if (included && roleId == (included.permissionValue & roleId)) {
        next();
      } else {
        return res
          .status(HttpStatus.FORBIDDEN)
          .json(
            new ErrorResult(
              'PermissionMiddlewareError',
              'you are not authorized this page. ',
            ),
          );
      }
    }
  }
}
