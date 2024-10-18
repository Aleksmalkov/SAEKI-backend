import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { QuestionDocument } from './question.schema';
import { CreateQuestionDto } from './dto/create-question.dto';
import { QuestionResponse } from './question-response.model';

@Injectable()
export class QuestionService {
  constructor(@InjectModel('Question') private questionModel: Model<QuestionDocument>) {}

  async createQuestion(createQuestionDto: CreateQuestionDto, userId: string): Promise<QuestionResponse> {
    const newQuestion = new this.questionModel({
      ...createQuestionDto,
      order: createQuestionDto.orderId, 
      user: userId,
      createdAt: new Date(),
    });

    const savedQuestion = await newQuestion.save();
    
    const populatedQuestion = await savedQuestion.populate({
      path: 'user',
      select: '_id name email'
    });

    return this.mapToQuestionResponse(populatedQuestion);
  }

  async getQuestionsForOrder(orderId: string): Promise<QuestionResponse[]> {
    const questions = await this.questionModel.find({ order: orderId }).populate('user').exec();
    return questions.map(this.mapToQuestionResponse);
  }

  private mapToQuestionResponse(question: QuestionDocument): QuestionResponse {
    return {
      id: question._id.toString(),
      content: question.content,
      createdAt: question.createdAt,
      user: {
        id: question.user.id.toString(),
        name: question.user.name,
        email: question.user.email,
      },
    };
  }
}
