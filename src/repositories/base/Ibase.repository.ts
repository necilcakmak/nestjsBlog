import { FilterHelper } from 'src/helper/filterHelper';

export interface IBaseRepository<T> {
  getAll(): Promise<T[]>;
  addEntity(entity: T): Promise<T>;
  getById(id: number): Promise<T>;
  getByEntity(entity: T): Promise<T>;
  deleteById(id: number): Promise<T>;
  deleteEntity(entity: T): Promise<T>;
  getAllByFilter(entity: FilterHelper<T>): Promise<T[]>;
}
