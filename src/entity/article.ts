import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';
import { BaseModel } from './baseModel';
import { Category } from './category';

@Entity('article')
export class Article extends BaseModel {
  @Column({ type: 'varchar', length: 50, nullable: false })
  articleName?: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  articleDescription?: string;

  @Column({ type: 'varchar', nullable: false })
  content?: string;

  @Column({type:'int',default:0})
  viewCount?:number

  @ManyToMany((type) => Category, (category) => category.articles)
  categories?: Category[];
}
