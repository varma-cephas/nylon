import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import { ConsoleLogger, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: new ConsoleLogger({
      prefix: 'nylon'
    })
  });
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe())
  await app.listen(3001);
}

void bootstrap();
