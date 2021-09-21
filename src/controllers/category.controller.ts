import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Category } from 'src/entity/category';
import { FilterHelper } from 'src/helper/filterHelper';
import { CategoryService } from 'src/services/category.service';

@Controller('Category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  async getAll() {
    const res = await this.categoryService.getAll();
    return res;
  }

  @Post('getAllFilter')
  async getFilter(@Body() category: FilterHelper<Category>) {
    const res = await this.categoryService.getAllByFilter(category);
    return res;
  }

  @Get(':id')
  async get(@Param('id') id: number) {
    const res = await this.categoryService.get(id);
    return res;
  }

  @Post()
  async add(@Body() category: Category) {
    const res = await this.categoryService.add(category);
    return res;
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    const res = await this.categoryService.deleteById(id);
    return res;
  }

  @Post('deleteEntities')
  async deleteIds(@Body() entitiesId: number[]) {
    const res = await this.categoryService.deleteIds(entitiesId);
    return res;
  }

  @Put()
  async update(@Body() category: Category) {
    const res = await this.categoryService.updateEntity(category);
    return res;
  }
}
