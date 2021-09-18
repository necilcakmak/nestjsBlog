import { User } from 'src/entity/user';
import { FilterHelper } from 'src/helper/filterHelper';
import { Repository } from 'typeorm';
import { IBaseRepository } from './Ibase.repository';

export class BaseRepository<T>
  extends Repository<T>
  implements IBaseRepository<T>
{
  public static onlineUser: User = {};

  async getAll(predicate: T = null): Promise<T[]> {
    let entities: T[];
    if (predicate) {
      entities = await this.find({ where: predicate });
    } else {
      entities = await this.find({});
    }
    return entities;
  }

  async addEntity(entity: T): Promise<T> {
    const res = await this.save(entity);
    return res;
  }

  async getById(id: number): Promise<T> {
    const entities = await this.findOne(id);
    return entities;
  }

  async deleteById(id: number): Promise<T> {
    const entities = await this.findOne(id);
    const res = await this.remove(entities);
    return res;
  }

  async deleteEntity(entity: T): Promise<T> {
    const res = await this.remove(entity);
    return res;
  }

  async updateEntity(entity: T): Promise<T> {
    const res = await this.save(entity);
    return res;
  }

  async getAllByFilter(entity: FilterHelper<T> = null): Promise<T[]> {
    const res = await this.find({
      relations: entity.includes,
      take: entity.count,
      where: entity.data,
    });
    return res;
  }
}
