import { BaseController } from './base/base.controller';
import { Article } from 'src/entity/article';
import { ArticleService } from 'src/services/article.service';
import { Controller } from '@nestjs/common';

@Controller('Article')
export class ArticleController extends BaseController<Article> {
  constructor(private readonly articleService: ArticleService) {
    super(articleService);
  }
}
