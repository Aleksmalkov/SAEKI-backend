import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';  // Import Apollo driver
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from '../auth/auth.module';
import { FileModule } from '../modules/file/file.module';
import { OrderModule } from '../modules/order/order.module';
import { QuestionModule } from '../modules/question/question.module';

@Module({
  imports: [
    ConfigModule.forRoot({ 
      isGlobal: true,
      envFilePath: process.env.NODE_ENV === 'production' ? '.env.prod' : '.env', 
    }),
    MongooseModule.forRoot("mongodb+srv://aleksajmalkov:admin123@saeki.d4x6v.mongodb.net"),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      path: "/graphql",
      context: ({ req }) => ({ req }),
    }),
    GraphQLModule.forRoot({
      cors: {
        origin: 'https://saeki-lilac.vercel.app',
        credentials: true,
      },
    }),
    AuthModule,
    FileModule,
    OrderModule,
    QuestionModule,
  ],
})
export class AppModule {}
