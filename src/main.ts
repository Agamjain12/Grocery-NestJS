import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bodyParser: true });

  app.useGlobalPipes(new ValidationPipe());
  // by setting whitelist true we make sure only the value
  // specified in dto goes in the controller

  app.use(cookieParser());

  await app.listen(3005);
}
bootstrap();
