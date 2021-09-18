import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import config from 'ormconfig';
import { AuthMiddleware } from 'src/middleware/Auth.middleware';
import { AuthModule } from '../auth.module';
import { UserModule } from '../user.module';
@Module({
  imports: [TypeOrmModule.forRoot(config), AuthModule, UserModule],
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
