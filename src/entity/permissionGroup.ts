import { Column, OneToMany, PrimaryGeneratedColumn, Entity } from 'typeorm';
import { Permission } from './permission';

@Entity()
export class PermissionGroup {
  @PrimaryGeneratedColumn()
  id?: number;
  @Column({ type: 'varchar', length: 30 })
  groupName?: string;

  @OneToMany((type) => Permission, (permission) => permission.permissionGroup)
  permissions?: Permission[];
}
