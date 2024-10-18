import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { QuestionService } from './question.service';
import { QuestionController } from './question.controller';
import { QuestionResolver } from './question.resolver';
import { QuestionDocument, QuestionSchema } from './question.schema';
import { AuthModule } from 'auth/auth.module';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Question', schema: QuestionSchema }]), AuthModule],
  providers: [QuestionService, QuestionResolver],
  controllers: [QuestionController],
  exports: [QuestionService],
})
export class QuestionModule {}
