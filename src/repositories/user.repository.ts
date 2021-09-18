import { Injectable } from '@nestjs/common';
import { User } from 'src/entity/user';
import { EntityRepository } from 'typeorm';
import { BaseRepository } from './base/base.repository';

@Injectable()
@EntityRepository(User)
export class UserRepository extends BaseRepository<User> {
  async getByEmail(email: string): Promise<User> {
    const entities = await this.findOne({ email: email });
    return entities;
  }
}
