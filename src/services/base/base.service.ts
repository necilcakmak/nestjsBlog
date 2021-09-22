import { FilterHelper } from 'src/helper/filterHelper';
import { DataResult } from 'src/helper/result/dataResult';
import { ErrorResult } from 'src/helper/result/errorResult';
import { Result } from 'src/helper/result/result';
import { BaseRepository } from 'src/repositories/base/base.repository';
import { IBaseService } from './Ibase.service';

export class BaseService<T> implements IBaseService<T> {
  constructor(private readonly baseRepository: BaseRepository<T>) {}

  async get(id: number): Promise<DataResult<T>> {
    try {
      const res = await this.baseRepository.getById(id);
      let totalCount: number = 0;
      if (res) {
        totalCount = 1;
      }

      await this.updateEntity(res);
      return new DataResult(res, 'GetSuccess', 'Entity get', totalCount);
    } catch (error) {
      return new ErrorResult('GetError', error.message);
    }
  }
  async getEntity(entity: T): Promise<DataResult<T>> {
    try {
      const res = await this.baseRepository.getByEntity(entity);
      return new DataResult(res, 'GetSuccess', 'Entity get', 1);
    } catch (error) {
      return new ErrorResult('GetError', error.message);
    }
  }
  async getAll(): Promise<DataResult<T[]>> {
    try {
      const res = await this.baseRepository.getAll();
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
  async deleteById(id: number): Promise<Result> {
    try {
      const res = await this.baseRepository.deleteById(id);
      return new Result('DeleteSuccess', 'Entity deleted', true);
    } catch (error) {
      return new ErrorResult('DeleteError', error.message);
    }
  }
  async deleteEntity(entity: T): Promise<Result> {
    try {
      const res = await this.baseRepository.deleteEntity(entity);
      return new Result('DeleteSuccess', 'Entity deleted', true);
    } catch (error) {
      return new ErrorResult('DeleteError', error.message);
    }
  }
  async add(entity: T): Promise<DataResult<T>> {
    try {
      const res = await this.baseRepository.addEntity(entity);
      return new DataResult(res, 'AddSuccess', 'Entity added', 1);
    } catch (error) {
      return new ErrorResult('AddError', error.message);
    }
  }
  async getAllByFilter(entity: FilterHelper<T>): Promise<DataResult<T[]>> {
    try {
      const res = await this.baseRepository.getAllByFilter(entity);
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
  async updateEntity(entity: T): Promise<DataResult<T>> {
    try {
      const res = await this.baseRepository.updateEntity(entity);
      return new DataResult(res, 'UpdatedSuccess', 'Entity updated', 1);
    } catch (error) {
      return new ErrorResult('UpdateError', error.message);
    }
  }

  async deleteIds(entitiesId: number[]): Promise<Result> {
    try {
      const res = await this.baseRepository.deleteEntitiesId(entitiesId);
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
}
