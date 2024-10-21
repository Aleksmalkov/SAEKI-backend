import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Automatically validate DTOs
  app.useGlobalPipes(new ValidationPipe());

  // Enable CORS for your frontend
  app.enableCors({
    origin: 'https://saeki-lilac.vercel.app',  // Your frontend origin
    credentials: true, // Allows credentials like cookies, headers
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',  // Specify allowed methods
    allowedHeaders: 'Content-Type, Authorization',  // Allow necessary headers
    preflightContinue: false,
    optionsSuccessStatus: 204  // Send 204 response for successful preflight requests
  });

  await app.listen(5000);  // Start the server on port 5000
}
bootstrap();
