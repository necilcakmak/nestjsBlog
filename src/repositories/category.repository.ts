import { Injectable } from '@nestjs/common';
import { Category } from 'src/entity/category';
import { EntityRepository } from 'typeorm';
import { BaseRepository } from './base/base.repository';

@Injectable()
@EntityRepository(Category)
export class CategoryRepository extends BaseRepository<Category> {
  async getByName(categoryName: string): Promise<Category> {
    const res = await this.findOne({ categoryName });
    return res;
  }
}
