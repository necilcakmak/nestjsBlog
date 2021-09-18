import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import config from 'ormconfig';
import { AuthMiddleware } from 'src/middleware/Auth.middleware';
import { ArticleModule } from '../article.module';
import { AuthModule } from '../auth.module';
import { CategoryModule } from '../category.module';
import { CommentModule } from '../comment.module';
import { UserModule } from '../user.module';
@Module({
  imports: [
    TypeOrmModule.forRoot(config),
    AuthModule,
    UserModule,
    ArticleModule,
    CategoryModule,
    CommentModule
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .exclude(
        {
          path: '/api/auth/login',
          method: RequestMethod.POST,
        },
        { path: '/api/auth/register', method: RequestMethod.POST },
      )
      .forRoutes('');
  }
}
