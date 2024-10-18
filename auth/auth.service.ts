import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.schema';
import { LoginDto } from '../common/dto/login.dto';
import { RegisterDto } from '../common/dto/register.dto';
import * as bcrypt from 'bcryptjs';
import { AuthResponse } from './auth-response.model';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @InjectModel(User.name) private userModel: Model<User>,
  ) {}

  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.userModel.findOne({ email }).exec();
    if (user && bcrypt.compareSync(password, user.password)) {
      return user;
    }
    throw new UnauthorizedException('Invalid credentials');
  }

  async login(loginDto: LoginDto): Promise<AuthResponse> {
    const user = await this.validateUser(loginDto.email, loginDto.password);
    const payload = { email: user.email, sub: user._id };
    const token = this.jwtService.sign(payload);
    const userObj = user.toObject() as User;
    userObj.id = userObj._id;
    delete userObj._id;
    return {
      token,
      user: {
        id: userObj.id,
        email: userObj.email,
        name: userObj.name,
      },
    };
  }

  async register(registerDto: RegisterDto): Promise<AuthResponse> {
    const hashedPassword = bcrypt.hashSync(registerDto.password, 10);
    const user = new this.userModel({ ...registerDto, password: hashedPassword });
    await user.save();

    const payload = { email: user.email, sub: user._id };

    // Transform Mongoose document to plain JS object and map _id to id
    const userObj = user.toObject() as User;  // Convert Mongoose document to plain JS object
    userObj.id = userObj._id;
    delete userObj._id;

    const token = this.jwtService.sign(payload);

    // Return token and user object
    return { token, user: {
      id: userObj.id,
      email: userObj.email,
      name: userObj.name,
    }, };
  }
}
