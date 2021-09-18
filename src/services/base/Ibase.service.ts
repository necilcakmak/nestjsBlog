import { FilterHelper } from 'src/helper/filterHelper';

export interface IBaseService<T> {
  get(id: number): Promise<T>;
  getAll(): Promise<T[]>;
  deleteById(id: number):Promise<T>;
  deleteEntity(entity: T): Promise<T>;
  add(entity: T): Promise<T>;
  getAllByFilter(entity: FilterHelper<T>): Promise<T[]>;
  //updateEntity(entity:T):Promise<T>;
}
