import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { BaseModel } from './baseModel';
import { Category } from './category';
import { Comment } from './comment';
import { User } from './user';

@Entity('article')
export class Article extends BaseModel {
  @Column({ type: 'varchar', length: 50, nullable: false })
  articleName?: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  articleDescription?: string;

  @Column({ type: 'varchar', nullable: false })
  content?: string;

  @Column({ type: 'int', default: 0 })
  viewCount?: number;

  @Column({ type: 'int', default: 0 })
  commentCount?: number;

  @Column({ type: 'int'})
  userId?: number;

  @OneToMany((type) => Comment, (comment) => comment.article)
  comments?: Comment[];

  @ManyToOne((type) => User, (user) => user.articles)
  user?: User;

  @ManyToMany((type) => Category, (category) => category.articles)
  categories?: Category[];
}
