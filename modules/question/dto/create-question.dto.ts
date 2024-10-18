import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class CreateQuestionDto {
  @Field()
  @IsString()
  @IsNotEmpty()
  content: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  orderId: string;
}
