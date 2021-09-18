import { Injectable } from "@nestjs/common";
import { Article } from "src/entity/article";
import { EntityRepository } from "typeorm";
import { BaseRepository } from "./base/base.repository";

@Injectable()
@EntityRepository(Article)
export class ArticleRepository extends BaseRepository<Article>{

}