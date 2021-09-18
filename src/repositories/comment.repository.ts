import { Injectable } from "@nestjs/common";
import { Comment } from "src/entity/comment";
import { EntityRepository } from "typeorm";
import { BaseRepository } from "./base/base.repository";

@Injectable()
@EntityRepository(Comment)
export class CommentRepository extends BaseRepository<Comment>{

}