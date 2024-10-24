import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

@InputType()
export class RegisterDto {
  @Field() 
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Field() 
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @Field() 
  @IsString()
  @IsNotEmpty()
  name: string;
}
