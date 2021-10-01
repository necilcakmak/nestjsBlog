import { Controller } from '@nestjs/common';
import { Category } from 'src/entity/category';
import { CategoryService } from 'src/services/category.service';
import { BaseController } from './base/base.controller';

@Controller('Category')
export class CategoryController extends BaseController<Category> {
  constructor(private readonly categoryService: CategoryService) {
    super(categoryService);
  }
}
