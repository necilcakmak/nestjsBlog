import { Column, Entity, ManyToOne } from 'typeorm';
import { Article } from './article';
import { BaseModel } from './baseModel';
import { User } from './user';

@Entity('comment')
export class Comment extends BaseModel {
  @Column({ type: 'varchar', nullable: false })
  commentDescription?: string;

  @Column({ type: 'int', nullable: true, default: 5 })
  commentRate?: number;

  @Column({ type: 'int' })
  userId?: number;

  @Column({ type: 'int' })
  articleId?: number;

  @ManyToOne((type) => User, (user) => user.comments)
  user?: User;

  @ManyToOne((type) => Article, (article) => article.comments)
  article?: Article;
}
