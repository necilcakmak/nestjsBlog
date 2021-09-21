import { FilterHelper } from 'src/helper/filterHelper';
import { DeleteResult } from 'typeorm';

export interface IBaseRepository<T> {
  //base repom bu imzaları doldurmak zorunda, özel repolar kendilerine has metodları kendi classlarında yazabilir
  getAll(): Promise<T[]>;
  addEntity(entity: T): Promise<T>;
  getById(id: number): Promise<T>;
  getByEntity(entity: T): Promise<T>;
  deleteById(id: number): Promise<T>;
  deleteEntity(entity: T): Promise<T>;
  deleteEntitiesId(entitiesId: number[]): Promise<DeleteResult>;
  getAllByFilter(entity: FilterHelper<T>): Promise<T[]>;
}
