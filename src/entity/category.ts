import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';
import { Article } from './article';
import { BaseModel } from './baseModel';

@Entity('category')
export class Category extends BaseModel {
  @Column({ type: 'varchar', length: 50, nullable: false })
  categoryName?: string;

  @Column({ type: 'varchar', length: 200, nullable: true })
  categoryDescription?: string;

  @ManyToMany((type) => Article, (article) => article.categories)
  @JoinTable({name:'category_article'})
  articles?: Article[];
}
