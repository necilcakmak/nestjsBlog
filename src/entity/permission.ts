import { PermissionGroup } from './permissionGroup';
import {
  OneToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  Column,
  Entity,
} from 'typeorm';
import { User } from './user';

@Entity()
export class Permission {
  @PrimaryGeneratedColumn()
  id?: number;
  @Column({ type: 'int' })
  userId?: number;
  @Column({ type: 'int' })
  permissionGroupId?: number;
  @Column({ type: 'int' })
  permissionValue?: number;

  @ManyToOne((type) => User, (user) => user.permissions)
  user?: User;

  @ManyToOne(
    (type) => PermissionGroup,
    (permissionGroup) => permissionGroup.permissions,
  )
  permissionGroup?: PermissionGroup;
}
