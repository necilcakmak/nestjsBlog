import { Injectable } from '@nestjs/common';
import { Comment } from 'src/entity/comment';
import { FilterHelper } from 'src/helper/filterHelper';
import { DataResult } from 'src/helper/result/dataResult';
import { ErrorResult } from 'src/helper/result/errorResult';
import { Result } from 'src/helper/result/result';
import { ArticleRepository } from 'src/repositories/article.repository';
import { CommentRepository } from 'src/repositories/comment.repository';
import { ArticleService } from './article.service';
import { IBaseService } from './base/Ibase.service';

@Injectable()
export class CommentService implements IBaseService<Comment> {
  constructor(
    private readonly commentRepository: CommentRepository,
    private readonly articleService: ArticleService,
  ) {}

  async get(id: number): Promise<DataResult<Comment>> {
    try {
      const res = await this.commentRepository.getById(id);
      let totalCount: number = 0;
      if (res) {
        totalCount = 1;
      }
      return new DataResult(res, 'GetSuccess', 'Entity get', totalCount);
    } catch (error) {
      return new ErrorResult('GetError', error.message);
    }
  }

  async getEntity(entity: Comment): Promise<DataResult<Comment>> {
    try {
      const res = await this.commentRepository.getByEntity(entity);
      return new DataResult(res, 'GetSuccess', 'Entity get', 1);
    } catch (error) {
      return new ErrorResult('GetError', error.message);
    }
  }

  async getAll(): Promise<DataResult<Comment[]>> {
    try {
      const res = await this.commentRepository.getAll();
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
    entity: FilterHelper<Comment> = null,
  ): Promise<DataResult<Comment[]>> {
    try {
      const res = await this.commentRepository.getAllByFilter(entity);
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
      const res = await this.commentRepository.deleteById(id);
      return new Result('DeleteSuccess', 'Entity deleted', true);
    } catch (error) {
      return new ErrorResult('DeleteError', error.message);
    }
  }

  async deleteEntity(entity: Comment): Promise<Result> {
    try {
      const res = await this.commentRepository.deleteEntity(entity);
      return new Result('DeleteSuccess', 'Entity deleted', true);
    } catch (error) {
      return new ErrorResult('DeleteError', error.message);
    }
  }

  async deleteIds(entitiesId: number[]): Promise<Result> {
    try {
      const res = await this.commentRepository.deleteEntitiesId(entitiesId);
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

  async add(entity: Comment): Promise<DataResult<Comment>> {
    try {
      const res = await this.commentRepository.addEntity(entity);
      if(!res){
        return new ErrorResult('AddError','Comment not added')
      }
      const article = await this.articleService.get(entity.articleId);
      article.data.commentCount += 1;
      await this.articleService.updateEntity(article.data);
      
      return new DataResult(res, 'AddSuccess', 'Entity added', 1);
    } catch (error) {
      return new ErrorResult('AddError', error.message);
    }
  }

  async updateEntity(entity: Comment): Promise<DataResult<Comment>> {
    try {
      const res = await this.commentRepository.updateEntity(entity);
      return new DataResult(res, 'UpdatedSuccess', 'Entity updated', 1);
    } catch (error) {
      return new ErrorResult('UpdateError', error.message);
    }
  }
}
