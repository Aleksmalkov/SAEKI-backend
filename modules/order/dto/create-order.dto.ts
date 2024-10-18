import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class CreateOrderDto {
  @Field() 
  @IsString()
  @IsNotEmpty()
  name: string;

  @Field() 
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Field() 
  @IsString()
  // @IsNotEmpty()
  material: string;

  @Field() 
  @IsString()
  @IsNotEmpty()
  fileUrl: string;

  @Field() 
  @IsString()
  company: string;

  @Field() 
  @IsString()
  cardNumber: string;

  @Field() 
  @IsString()
  cardType: string;

  @Field({ nullable: true }) 
  purchaseOrder: string | null;
}
