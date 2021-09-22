import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentController } from 'src/controllers/comment.controller';
import { ArticleRepository } from 'src/repositories/article.repository';
import { CommentRepository } from 'src/repositories/comment.repository';
import { CommentService } from 'src/services/comment.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([CommentRepository]),
    TypeOrmModule.forFeature([ArticleRepository]),
  ],
  controllers: [CommentController],
  providers: [CommentService],
})
export class CommentModule {}
