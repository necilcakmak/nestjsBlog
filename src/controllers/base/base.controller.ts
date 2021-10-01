import { BaseService } from './../../services/base/base.service';
import { Body, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { FilterHelper } from 'src/helper/filterHelper';

export abstract class BaseController<T> {
  constructor(private readonly baseService: BaseService<T>) {}

  @Get('getall')
  async getAll() {
    const res = await this.baseService.getAll();
    return res;
  }

  @Post('getAllFilter')
  async getFilter(@Body() entity: FilterHelper<T>) {
    const res = await this.baseService.getAllByFilter(entity);
    return res;
  }

  @Get('getbyid')
  async get(@Param('id') id: number) {
    const res = await this.baseService.get(id);
    return res;
  }

  @Post('add')
  async add(@Body() entity: T) {
    const res = await this.baseService.add(entity);
    return res;
  }

  @Delete('delete')
  async delete(@Param('id') id: number) {
    const res = await this.baseService.deleteById(id);
    return res;
  }

  @Post('deleteEntities')
  async deleteIds(@Body() entitiesId: number[]) {
    const res = await this.baseService.deleteIds(entitiesId);
    return res;
  }

  @Put('update')
  async update(@Body() entity: T) {
    const res = await this.baseService.updateEntity(entity);
    return res;
  }
}
