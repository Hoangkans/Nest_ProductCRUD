import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Cấu hình global pipe để sử dụng class-validator
  app.useGlobalPipes(
    new ValidationPipe({
      forbidNonWhitelisted: true, //loai bo cac field khong co trong DTO
      whitelist: true, // chi cho phep cac field co trong DTO
      transform: true, // tu dong chuyen doi type
    }),
  );

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap().catch(console.error);
