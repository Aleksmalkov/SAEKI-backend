import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable validation globally
  app.useGlobalPipes(new ValidationPipe());

  // Enable CORS globally
  app.enableCors({
    origin: 'https://saeki-lilac.vercel.app',  // Your frontend origin
    credentials: true,  // Allow credentials (cookies, etc.)
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',  // Allow necessary HTTP methods
    allowedHeaders: 'Content-Type, Authorization',  // Specify allowed headers
  });

  await app.listen(5000);  // Start the server on port 5000
}
bootstrap();
