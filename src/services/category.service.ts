import { Injectable } from '@nestjs/common';
import { Category } from 'src/entity/category';
import { FilterHelper } from 'src/helper/filterHelper';
import { DataResult } from 'src/helper/result/dataResult';
import { ErrorResult } from 'src/helper/result/errorResult';
import { Result } from 'src/helper/result/result';
import { CategoryRepository } from 'src/repositories/category.repository';
import { IBaseService } from './base/Ibase.service';

@Injectable()
export class CategoryService implements IBaseService<Category> {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async get(id: number): Promise<DataResult<Category>> {
    try {
      const res = await this.categoryRepository.getById(id);
      let totalCount: number = 0;
      if (res) {
        totalCount = 1;
      }
      return new DataResult(res, 'GetSuccess', 'Entity get', totalCount);
    } catch (error) {
      return new ErrorResult('GetError', error.message);
    }
  }

  async getEntity(entity: Category): Promise<DataResult<Category>> {
    try {
      const res = await this.categoryRepository.getByEntity(entity);
      return new DataResult(res, 'GetSuccess', 'Entity get', 1);
    } catch (error) {
      return new ErrorResult('GetError', error.message);
    }
  }

  async getAll(): Promise<DataResult<Category[]>> {
    try {
      const res = await this.categoryRepository.getAll();
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
    entity: FilterHelper<Category> = null,
  ): Promise<DataResult<Category[]>> {
    try {
      const res = await this.categoryRepository.getAllByFilter(entity);
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
      const res = await this.categoryRepository.deleteById(id);
      return new Result('DeleteSuccess', 'Entity deleted', true);
    } catch (error) {
      return new ErrorResult('DeleteError', error.message);
    }
  }

  async deleteEntity(entity: Category): Promise<Result> {
    try {
      const res = await this.categoryRepository.deleteEntity(entity);
      return new Result('DeleteSuccess', 'Entity deleted', true);
    } catch (error) {
      return new ErrorResult('DeleteError', error.message);
    }
  }

  async deleteIds(entitiesId: number[]): Promise<Result> {
    try {
      const res = await this.categoryRepository.deleteEntitiesId(entitiesId);
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

  async add(entity: Category): Promise<DataResult<Category>> {
    try {
      const res = await this.categoryRepository.addEntity(entity);
      return new DataResult(res, 'AddSuccess', 'Entity added', 1);
    } catch (error) {
      return new ErrorResult('AddError', error.message);
    }
  }

  async updateEntity(entity: Category): Promise<DataResult<Category>> {
    try {
      const res = await this.categoryRepository.updateEntity(entity);
      return new DataResult(res, 'UpdatedSuccess', 'Entity updated', 1);
    } catch (error) {
      return new ErrorResult('UpdateError', error.message);
    }
  }
}
