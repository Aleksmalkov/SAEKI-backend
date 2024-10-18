import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { AuthResponse } from './auth-response.model';
import { LoginDto } from '../common/dto/login.dto';
import { RegisterDto } from '../common/dto/register.dto';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => AuthResponse)
  async login(@Args('input') loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Mutation(() => AuthResponse)
  async register(@Args('input') registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }
}

