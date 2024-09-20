import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors(); // Enable CORS for Angular frontend
  app.useGlobalPipes(new ValidationPipe()); // Use validation globally
  await app.listen(3000);
}
bootstrap();
