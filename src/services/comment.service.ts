import { Injectable } from '@nestjs/common';
import { Comment } from 'src/entity/comment';
import { DataResult } from 'src/helper/result/dataResult';
import { ErrorResult } from 'src/helper/result/errorResult';
import { ArticleRepository } from 'src/repositories/article.repository';
import { CommentRepository } from 'src/repositories/comment.repository';
import { BaseService } from './base/base.service';

@Injectable()
export class CommentService extends BaseService<Comment> {
  constructor(
    private readonly commentRepository: CommentRepository,
    private readonly articleRepository: ArticleRepository,
  ) {
    super(commentRepository);
  }

  async add(entity: Comment): Promise<DataResult<Comment>> {
    try {
      const res = await this.commentRepository.addEntity(entity);
      if (!res) {
        return new ErrorResult('AddError', 'Comment not added');
      }
      const article = await this.articleRepository.getById(entity.articleId);
      article.commentCount += 1;
      await this.articleRepository.updateEntity(article);

      return new DataResult(res, 'AddSuccess', 'Entity added', 1);
    } catch (error) {
      return new ErrorResult('AddError', error.message);
    }
  }
}
