import { Injectable } from '@nestjs/common';
import { Category } from 'src/entity/category';
import { FilterHelper } from 'src/helper/filterHelper';
import { CategoryRepository } from 'src/repositories/category.repository';
import { IBaseService } from './base/Ibase.service';

@Injectable()
export class CategoryService implements IBaseService<Category> {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async get(id: number): Promise<Category> {
    const res = await this.categoryRepository.getById(id);
    return res;
  }
  async getAll(): Promise<Category[]> {
    const res = await this.categoryRepository.getAll();
    return res;
  }

  async getAllByFilter(
    entity: FilterHelper<Category> = null,
  ): Promise<Category[]> {
    const res = await this.categoryRepository.getAllByFilter(entity);
    return res;
  }

  async deleteById(id: number): Promise<Category> {
    const res = await this.categoryRepository.deleteById(id);
    return res;
  }

  async deleteEntity(entity: Category): Promise<Category> {
    const res = await this.categoryRepository.deleteEntity(entity);
    return res;
  }

  async add(entity: Category): Promise<Category> {
    const res = await this.categoryRepository.addEntity(entity);
    return res;
  }

  async updateEntity(entity: Category): Promise<Category> {
    const res = await this.categoryRepository.updateEntity(entity);
    return res;
  }
}
