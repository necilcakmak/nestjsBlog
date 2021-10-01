import { Controller } from '@nestjs/common';
import { Comment } from 'src/entity/comment';
import { CommentService } from 'src/services/comment.service';
import { BaseController } from './base/base.controller';

@Controller('Comment')
export class CommentController extends BaseController<Comment> {
  constructor(private readonly commentService: CommentService) {
    super(commentService);
  }
}
