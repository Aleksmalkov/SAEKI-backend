import { IsNotEmpty, IsString } from 'class-validator';

export class EnvironmentVariables {
  @IsNotEmpty()
  @IsString()
  MONGO_URI: string;

  @IsNotEmpty()
  @IsString()
  JWT_SECRET: string;
}
