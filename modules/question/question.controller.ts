import { Controller, Post, Body, Req, UseGuards } from '@nestjs/common';
import { QuestionService } from './question.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { JwtAuthGuard } from 'common/guards/jwt-auth.guard';  // If you're using a JWT guard

@Controller('questions')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  // Protect the route with JWT Auth Guard
  @UseGuards(JwtAuthGuard)
  @Post()
  createQuestion(@Body() createQuestionDto: CreateQuestionDto, @Req() req) {
    return this.questionService.createQuestion(createQuestionDto, req.user._id);
  }
}
