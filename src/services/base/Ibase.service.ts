import { FilterHelper } from 'src/helper/filterHelper';
import { DataResult } from 'src/helper/result/dataResult';
import { Result } from 'src/helper/result/result';

export interface IBaseService<T> {
  //oluşturulan servislerin bu imzalarını doldurmak zorunda bırakmak amacıyla bunu oluşturdum
  //eğer ilgili servis basit bir işlem ise implement almayacak
  get(id: number): Promise<DataResult<T>>;
  getEntity(entity: T): Promise<DataResult<T>>;
  getAll(): Promise<DataResult<T[]>>;
  deleteById(id: number): Promise<Result>;
  deleteEntity(entity: T): Promise<Result>;
  add(entity: T): Promise<DataResult<T>>;
  getAllByFilter(entity: FilterHelper<T>): Promise<DataResult<T[]>>;
  updateEntity(entity: T): Promise<DataResult<T>>;
  deleteIds(entitiesId: number[]): Promise<Result>;
}
