import { Injectable } from '@nestjs/common';
import { Article } from 'src/entity/article';
import { FilterHelper } from 'src/helper/filterHelper';
import { DataResult } from 'src/helper/result/dataResult';
import { ErrorResult } from 'src/helper/result/errorResult';
import { Result } from 'src/helper/result/result';
import { ArticleRepository } from 'src/repositories/article.repository';
import { IBaseService } from './base/Ibase.service';

@Injectable()
export class ArticleService implements IBaseService<Article> {
  constructor(private readonly articleRepository: ArticleRepository) {}

  async get(id: number): Promise<DataResult<Article>> {
    try {
      const res = await this.articleRepository.getById(id);
      let totalCount: number = 0;
      if (res) {
        res.viewCount += 1;
        totalCount = 1;
      }

      await this.updateEntity(res);
      return new DataResult(res, 'GetSuccess', 'Entity get', totalCount);
    } catch (error) {
      return new ErrorResult('GetError', error.message);
    }
  }

  async getEntity(entity: Article): Promise<DataResult<Article>> {
    try {
      const res = await this.articleRepository.getByEntity(entity);
      return new DataResult(res, 'GetSuccess', 'Entity get', 1);
    } catch (error) {
      return new ErrorResult('GetError', error.message);
    }
  }

  async getAll(): Promise<DataResult<Article[]>> {
    try {
      const res = await this.articleRepository.getAll();
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
    entity: FilterHelper<Article> = null,
  ): Promise<DataResult<Article[]>> {
    try {
      const res = await this.articleRepository.getAllByFilter(entity);
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
      const res = await this.articleRepository.deleteById(id);
      return new Result('DeleteSuccess', 'Entity deleted', true);
    } catch (error) {
      return new ErrorResult('DeleteError', error.message);
    }
  }

  async deleteEntity(entity: Article): Promise<Result> {
    try {
      const res = await this.articleRepository.deleteEntity(entity);
      return new Result('DeleteSuccess', 'Entity deleted', true);
    } catch (error) {
      return new ErrorResult('DeleteError', error.message);
    }
  }

  async deleteIds(entitiesId: number[]): Promise<Result> {
    try {
      const res = await this.articleRepository.deleteEntitiesId(entitiesId);
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

  async add(entity: Article): Promise<DataResult<Article>> {
    try {
      const res = await this.articleRepository.addEntity(entity);
      return new DataResult(res, 'AddSuccess', 'Entity added', 1);
    } catch (error) {
      return new ErrorResult('AddError', error.message);
    }
  }

  async updateEntity(entity: Article): Promise<DataResult<Article>> {
    try {
      const res = await this.articleRepository.updateEntity(entity);
      return new DataResult(res, 'UpdatedSuccess', 'Entity updated', 1);
    } catch (error) {
      return new ErrorResult('UpdateError', error.message);
    }
  }
}
