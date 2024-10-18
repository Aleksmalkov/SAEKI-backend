import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql';
import { QuestionService } from './question.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { QuestionResponse } from './question-response.model';
import { JwtAuthGuard } from 'common/guards/jwt-auth.guard';
import { UnauthorizedException, UseGuards } from '@nestjs/common';

@Resolver()
export class QuestionResolver {
  constructor(private readonly questionService: QuestionService) {}

  @UseGuards(JwtAuthGuard)
  @Mutation(() => QuestionResponse)
  async createQuestion(
    @Args('input') createQuestionDto: CreateQuestionDto,
    @Context() context: any,
  ): Promise<QuestionResponse> {
    const req = context.req; 
    const user = req.user; 
    return this.questionService.createQuestion(createQuestionDto, user._id);
  }

  @Query(() => [QuestionResponse])
  async getQuestionsForOrder(@Args('orderId') orderId: string): Promise<QuestionResponse[]> {
    return this.questionService.getQuestionsForOrder(orderId);
  }
}
