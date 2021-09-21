import { Injectable } from '@nestjs/common';
import { User } from 'src/entity/user';
import { FilterHelper } from 'src/helper/filterHelper';
import { DataResult } from 'src/helper/result/dataResult';
import { ErrorResult } from 'src/helper/result/errorResult';
import { Result } from 'src/helper/result/result';
import { UserRepository } from 'src/repositories/user.repository';
import { IBaseService } from './base/Ibase.service';

@Injectable()
export class UserService implements IBaseService<User> {
  constructor(private readonly userRepository: UserRepository) {}

  async get(id: number): Promise<DataResult<User>> {
    try {
      const res = await this.userRepository.getById(id);
      let totalCount: number = 0;
      if (res) {
        totalCount = 1;
      }
      return new DataResult(res, 'GetSuccess', 'Entity get', totalCount);
    } catch (error) {
      return new ErrorResult('GetError', error.message);
    }
  }

  async getEntity(entity: User): Promise<DataResult<User>> {
    try {
      const res = await this.userRepository.getByEntity(entity);
      return new DataResult(res, 'GetSuccess', 'Entity get', 1);
    } catch (error) {
      return new ErrorResult('GetError', error.message);
    }
  }

  async getAll(): Promise<DataResult<User[]>> {
    try {
      const res = await this.userRepository.getAll();
      return new DataResult(
        res,
        'GetAllSuccess',
        'Entities get all',
        res.length,
      );
    } catch (error) {
      return new ErrorResult('GetAllError', error.message);
    }
  }

  async getAllByFilter(
    entity: FilterHelper<User> = null,
  ): Promise<DataResult<User[]>> {
    try {
      const res = await this.userRepository.getAllByFilter(entity);
      return new DataResult(
        res,
        'GetAllFilterSuccess',
        'Entities filter success',
        res.length,
      );
    } catch (error) {
      return new ErrorResult('GetAllFilterError', error.message);
    }
  }

  async deleteById(id: number): Promise<Result> {
    try {
      const res = await this.userRepository.deleteById(id);
      return new Result('DeleteSuccess', 'Entity deleted', true);
    } catch (error) {
      return new ErrorResult('DeleteError', error.message);
    }
  }

  async deleteEntity(entity: User): Promise<Result> {
    try {
      const res = await this.userRepository.deleteEntity(entity);
      return new Result('DeleteSuccess', 'Entity deleted', true);
    } catch (error) {
      return new ErrorResult('DeleteError', error.message);
    }
  }

  async deleteIds(entitiesId: number[]): Promise<Result> {
    try {
      const res = await this.userRepository.deleteEntitiesId(entitiesId);
      if (res.affected > 0) {
        return new Result(
          'DeleteSuccess',
          'Entities deleted',
          true,
          res.affected,
        );
      }
      return new ErrorResult('DeleteError', 'No record found to be deleted');
    } catch (error) {
      return new ErrorResult('DeleteError', error.message);
    }
  }

  async add(entity: User): Promise<DataResult<User>> {
    try {
      const res = await this.userRepository.addEntity(entity);
      return new DataResult(res, 'AddSuccess', 'Entity added', 1);
    } catch (error) {
      return new ErrorResult('AddError', error.message);
    }
  }

  async updateEntity(entity: User): Promise<DataResult<User>> {
    try {
      const res = await this.userRepository.updateEntity(entity);
      return new DataResult(res, 'UpdatedSuccess', 'Entity updated', 1);
    } catch (error) {
      return new ErrorResult('UpdateError', error.message);
    }
  }
}
