import { Injectable } from '@nestjs/common';
import { Article } from 'src/entity/article';
import { DataResult } from 'src/helper/result/dataResult';
import { ErrorResult } from 'src/helper/result/errorResult';
import { ArticleRepository } from 'src/repositories/article.repository';
import { BaseService } from './base/base.service';

@Injectable()
export class ArticleService extends BaseService<Article> {
  constructor(private readonly articleRepository: ArticleRepository) {
    super(articleRepository);
  }
  //article get farklı çalışıyor. Bunu baseden almayalım ezelim.
  async get(id: number) {
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
}
