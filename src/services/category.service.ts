import { Injectable } from '@nestjs/common';
import { Category } from 'src/entity/category';
import { DataResult } from 'src/helper/result/dataResult';
import { ErrorResult } from 'src/helper/result/errorResult';
import { CategoryRepository } from 'src/repositories/category.repository';
import { BaseService } from './base/base.service';

@Injectable()
export class CategoryService extends BaseService<Category> {
  constructor(private readonly categoryRepository: CategoryRepository) {
    super(categoryRepository);
  }

  async add(entity: Category): Promise<DataResult<Category>> {
    try {
      const categoryInDb = await this.categoryRepository.getByName(
        entity.categoryName,
      );
      if (categoryInDb) {
        return new ErrorResult('AddError', 'Category name used');
      }
      const res = await this.categoryRepository.addEntity(entity);
      return new DataResult(res, 'AddSuccess', 'Entity added', 1);
    } catch (error) {
      return new ErrorResult('AddError', error.message);
    }
  }
}
