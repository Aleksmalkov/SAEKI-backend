import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Enable validation globally
  app.useGlobalPipes(new ValidationPipe());

  // Enable CORS globally
  app.enableCors({
    origin: 'http://localhost:3000',  // Your frontend origin
    credentials: true,  // Allow credentials (cookies, etc.)

  });

  // app.use((req, res, next) => {
  //   if (req.method === 'OPTIONS') {
  //     res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
  //     res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  //     return res.status(200).end();  // Respond with a 200 for preflight requests
  //   }
  //   next();
  // });

  await app.listen(5000);  // Start the server on port 5000
}
bootstrap();
