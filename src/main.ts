import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());  // Automatically validate DTOs
  // Enable CORS for your frontend running on localhost:3000
  app.enableCors({
    origin: 'http://localhost:3000',  // Allow requests from this origin (your frontend)
    credentials: true,                // If you're using cookies or authentication
  });
  await app.listen(5000);  // Start the server on port 5000
}
bootstrap();
