import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseModel } from './baseModel';
import { User } from './user';

@Entity('permission')
export class Permission extends BaseModel {
  @Column({ type: 'varchar', nullable: false, default: 'All' })
  controllerName?: string;

  @Column({ type: 'boolean', default: 1 })
  all?: boolean;

  @Column({ type: 'boolean', default: 1 })
  create?: boolean;

  @Column({ type: 'boolean', default: 1 })
  read?: boolean;

  @Column({ type: 'boolean', default: 1 })
  update?: boolean;

  @Column({ type: 'boolean', default: 1 })
  delete?: boolean;

  @Column({ type: 'int' })
  userId?: number;

  @ManyToOne((type) => User, (user) => user.permission)
  user?: User;
}
