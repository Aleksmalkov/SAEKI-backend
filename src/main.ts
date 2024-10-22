import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  // Enable CORS for the correct origins
  app.enableCors({
    origin: ['https://saeki-lilac.vercel.app', 'https://saeki-backend-demo.vercel.app', 'http://localhost:3000'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
    allowedHeaders: 'Content-Type, Authorization',
  });

  await app.listen(3000);  // NestJS will listen on port 3000 inside Vercel
}

// Export a Vercel handler
export const handler = bootstrap;
