import { Injectable } from '@nestjs/common';
import { User } from 'src/entity/user';
import { FilterHelper } from 'src/helper/filterHelper';
import { UserRepository } from 'src/repositories/user.repository';
import { IBaseService } from './base/Ibase.service';

@Injectable()
export class UserService implements IBaseService<User> {
  constructor(private readonly userRepository: UserRepository) {}

  async get(id: number): Promise<User> {
    const res = await this.userRepository.getById(id);
    return res;
  }
  async getAll(): Promise<User[]> {
    const res = await this.userRepository.getAll();
    return res;
  }

  async getAllByFilter(
    entity: FilterHelper<User> = null,
  ): Promise<User[]> {
    const res = await this.userRepository.getAllByFilter(entity);
    return res;
  }

  async deleteById(id: number): Promise<User> {
    const res = await this.userRepository.deleteById(id);
    return res;
  }

  async deleteEntity(entity: User): Promise<User> {
    const res = await this.userRepository.deleteEntity(entity);
    return res;
  }

  async add(entity: User): Promise<User> {
    const res = await this.userRepository.addEntity(entity);
    return res;
  }

  async updateEntity(entity: User): Promise<User> {
    const res = await this.userRepository.updateEntity(entity);
    return res;
  }
}
