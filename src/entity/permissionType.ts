import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class PermissionType {
  @PrimaryGeneratedColumn()
  id?: number;
  @Column({ type: 'varchar', length: 30 })
  typeName?: string;
  @Column({ type: 'int' })
  typeValue?: number;
}
