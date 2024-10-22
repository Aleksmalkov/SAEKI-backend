// import { NestFactory } from '@nestjs/core';
// import { AppModule } from './app.module';
// import { ValidationPipe } from '@nestjs/common';

// async function bootstrap() {
//   const app = await NestFactory.create(AppModule);
//   // Enable validation globally
//   app.useGlobalPipes(new ValidationPipe());

//   app.enableCors({
//     origin: ['https://saeki-lilac.vercel.app', 'https://saeki-backend-demo.vercel.app', 'http://localhost:3000'],
//     methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
//     credentials: true,
//     allowedHeaders: 'Content-Type, Authorization',
//   });

//   await app.listen(5000);  // Start the server on port 5000
// }
// bootstrap();
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  app.enableCors({
    origin: ['https://saeki-lilac.vercel.app', 'https://saeki-backend-demo.vercel.app', 'http://localhost:3000'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
    allowedHeaders: 'Content-Type, Authorization',
  });

  await app.init();
  
  // Return the http adapter instance without generic type arguments
  return app.getHttpAdapter().getInstance();
}

export const handler = async (event: any, context: any) => {
  const server = await bootstrap();
  const result = await server(event, context);
  return result;
};
