import { ValidationError, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ValidationException } from './filters/validationException';
import { ValidationFilter } from './filters/validationFilter';
import { AppModule } from './modules/app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');

  // validation Filter
  app.useGlobalFilters(new ValidationFilter());

  app.useGlobalPipes(
    new ValidationPipe({
      skipMissingProperties: false,
      exceptionFactory: (errors: ValidationError[]) => {
        const messages = errors.map((error) => {
          return {
            name: error.property,
            message: Object.values(error.constraints)[0],
          };
        });
        return new ValidationException(messages);
      },
    }),
  );

  await app.listen(process.env.PORT);
}
bootstrap();
