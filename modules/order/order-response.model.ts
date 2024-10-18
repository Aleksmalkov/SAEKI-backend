import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class OrderResponse {

  @Field(() => ID)
  id: string;

  @Field(() => String)
  name: string;

  @Field(() => String)
  email: string;

  @Field(() => String)
  company: string;

  @Field(() => String)
  cardType: string;

  @Field(() => String)
  cardNumber: string;

  @Field(() => String)
  fileUrl: string;

  @Field(() => String, { nullable: true })
  purchaseOrder: string | null;

  @Field(() => String)
  material: string;

  @Field(() => Date)
  createdAt: Date;
}
