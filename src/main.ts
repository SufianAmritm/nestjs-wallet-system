import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import { json, urlencoded } from 'express';
import { Logger, ValidationPipe } from '@nestjs/common';
import { error } from 'console';
import config from './common/config/index';
import { ExceptionHandler } from './common/errorHandler';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(json({ limit: '5mb' }));
  app.use(urlencoded({ extended: true, limit: '5mb' }));
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );
  app.setGlobalPrefix('api');
  await app.listen(config.port, () => console.log('server started'));
}
bootstrap().catch((err) => {
  Logger.error(error);
  process.exit(1);
});
