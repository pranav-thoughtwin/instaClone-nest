import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user-dto';
import { LoginUserDto } from './dto/login-user-dto';
import { ConfigService } from '@nestjs/config';
import { User } from './entities/user.entity';
import { AuthGuard } from '@nestjs/passport';
import { Token } from './interfaces/token';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {}

  @Get()
  getAllUser(): string {
    return this.authService.getAllUsers();
  }

  @Post('signup')
  signup(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.authService.signup(createUserDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('profileTest')
  profileTest(): string {
    return this.authService.profileTest();
  }

  @HttpCode(200)
  @UseGuards(AuthGuard('local'))
  @Post('login')
  login(@Body() loginUserDto: LoginUserDto): Promise<Token> {
    return this.authService.login(loginUserDto);
  }
}
