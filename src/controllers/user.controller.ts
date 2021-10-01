import { Controller } from '@nestjs/common';
import { Roles } from 'src/decorator/roles.decorator';
import { User } from 'src/entity/user';
import { Role } from 'src/enum/role.enum';
import { UserService } from 'src/services/user.service';
import { BaseController } from './base/base.controller';

@Roles(Role.Admin)
@Controller('User')
export class UserController extends BaseController<User> {
  constructor(private readonly userService: UserService) {
    super(userService);
  }
}
