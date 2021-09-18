import { Injectable } from '@nestjs/common';
import { Article } from 'src/entity/article';
import { FilterHelper } from 'src/helper/filterHelper';
import { ArticleRepository } from 'src/repositories/article.repository';
import { IBaseService } from './base/Ibase.service';

@Injectable()
export class ArticleService implements IBaseService<Article> {
  constructor(private readonly articleRepository: ArticleRepository) {}

  async get(id: number): Promise<Article> {
    const res = await this.articleRepository.getById(id);
    res.viewCount += 1;
    await this.updateEntity(res);
    return res;
  }
  async getAll(): Promise<Article[]> {
    const res = await this.articleRepository.getAll();
    return res;
  }

  async getAllByFilter(
    entity: FilterHelper<Article> = null,
  ): Promise<Article[]> {
    const res = await this.articleRepository.getAllByFilter(entity);
    return res;
  }

  async deleteById(id: number): Promise<Article> {
    const res = await this.articleRepository.deleteById(id);
    return res;
  }

  async deleteEntity(entity: Article): Promise<Article> {
    const res = await this.articleRepository.deleteEntity(entity);
    return res;
  }

  async add(entity: Article): Promise<Article> {
    const res = await this.articleRepository.addEntity(entity);
    return res;
  }

  async updateEntity(entity: Article): Promise<Article> {
    const res = await this.articleRepository.updateEntity(entity);
    return res;
  }
}
