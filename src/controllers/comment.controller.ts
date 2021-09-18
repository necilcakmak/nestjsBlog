import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Article } from 'src/entity/article';
import { Comment } from 'src/entity/comment';
import { FilterHelper } from 'src/helper/filterHelper';
import { CommentService } from 'src/services/comment.service';

@Controller('Comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Get()
  async getAll() {
    const res = await this.commentService.getAll();
    return res;
  }

  @Post('getAllFilter')
  async getFilter(@Body() comment: FilterHelper<Comment>) {
    const res = await this.commentService.getAllByFilter(comment);
    return res;
  }

  @Get(':id')
  async get(@Param('id') id: number) {
    const res = await this.commentService.get(id);
    return res;
  }

  @Post()
  async add(@Body() comment: Comment) {
    const res = await this.commentService.add(comment);
    return res;
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    const res = await this.commentService.deleteById(id);
    return res;
  }

  @Put()
  async update(@Body() comment: Comment) {
    const res = await this.commentService.updateEntity(comment);
    return res;
  }
}
