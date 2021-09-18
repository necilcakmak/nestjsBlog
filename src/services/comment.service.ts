import { Injectable } from '@nestjs/common';
import { Comment } from 'src/entity/comment';
import { FilterHelper } from 'src/helper/filterHelper';
import { CommentRepository } from 'src/repositories/comment.repository';
import { IBaseService } from './base/Ibase.service';

@Injectable()
export class CommentService implements IBaseService<Comment> {
  constructor(private readonly commentRepository: CommentRepository) {}

  async get(id: number): Promise<Comment> {
    const res = await this.commentRepository.getById(id);
    return res;
  }
  async getAll(): Promise<Comment[]> {
    const res = await this.commentRepository.getAll();
    return res;
  }

  async getAllByFilter(
    entity: FilterHelper<Comment> = null,
  ): Promise<Comment[]> {
    const res = await this.commentRepository.getAllByFilter(entity);
    return res;
  }

  async deleteById(id: number): Promise<Comment> {
    const res = await this.commentRepository.deleteById(id);
    return res;
  }

  async deleteEntity(entity: Comment): Promise<Comment> {
    const res = await this.commentRepository.deleteEntity(entity);
    return res;
  }

  async add(entity: Comment): Promise<Comment> {
    const res = await this.commentRepository.addEntity(entity);
    return res;
  }

  async updateEntity(entity: Comment): Promise<Comment> {
    const res = await this.commentRepository.updateEntity(entity);
    return res;
  }
}
