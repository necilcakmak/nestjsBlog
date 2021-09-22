import { Injectable } from '@nestjs/common';
import { User } from 'src/entity/user';
import { UserRepository } from 'src/repositories/user.repository';
import { BaseService } from './base/base.service';

@Injectable()
export class UserService extends BaseService<User> {
  constructor(private readonly userRepository: UserRepository) {
    super(userRepository);
  }
}
