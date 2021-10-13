import { BaseRepository } from 'src/repositories/base/base.repository';
import {
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export abstract class BaseModel {
  @PrimaryGeneratedColumn()
  id?: number;
  @CreateDateColumn({ type: 'datetime' })
  createdDate?: Date;
  @UpdateDateColumn({ type: 'datetime' })
  updatedDate?: Date;
  @Column({ type: 'boolean', default: true })
  isActive?: boolean;
}
