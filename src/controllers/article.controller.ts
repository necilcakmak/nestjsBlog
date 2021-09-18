import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Article } from 'src/entity/article';
import { FilterHelper } from 'src/helper/filterHelper';
import { ArticleService } from 'src/services/article.service';

@Controller('Article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Get()
  async getAll() {
    const res = await this.articleService.getAll();
    return res;
  }

  @Post('getAllFilter')
  async getFilter(@Body() article: FilterHelper<Article>) {
    const res = await this.articleService.getAllByFilter(article);
    return res;
  }

  @Get(':id')
  async get(@Param('id') id: number) {
    const res = await this.articleService.get(id);
    return res;
  }

  @Post()
  async add(@Body() article: Article) {
    const res = await this.articleService.add(article);
    return res;
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    const res = await this.articleService.deleteById(id);
    return res;
  }

  @Put()
  async update(@Body() article: Article) {
    const res = await this.articleService.updateEntity(article);
    return res;
  }
}
