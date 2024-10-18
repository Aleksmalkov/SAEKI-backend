import { Field, ObjectType, ID } from '@nestjs/graphql';
import { User } from 'auth/user.model';

@ObjectType()
export class QuestionResponse {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  content: string;

  @Field(() => User)
  user: User;

  @Field(() => Date)
  createdAt: Date;
}
