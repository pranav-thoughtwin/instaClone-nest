import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user-dto';
import { LoginUserDto } from './dto/login-user-dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Token } from './interfaces/token';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}
  getAllUsers(): string {
    return 'All users';
  }

  async signup(createUserDto: CreateUserDto): Promise<User> {
    const existingEmail = await this.userRepository.findOne({
      where: {
        email: createUserDto.email,
      },
    });

    const existingUsername = await this.userRepository.findOne({
      where: {
        username: createUserDto.username,
      },
    });
    if (existingEmail) {
      throw new ConflictException('User with this email already exists');
    }
    if (existingUsername) {
      throw new ConflictException('Username already taken');
    }

    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const newUser = this.userRepository.create({
      ...createUserDto,
      password: hashedPassword,
    });
    return await this.userRepository.save(newUser);
  }

  async login(loginUserDto: LoginUserDto): Promise<Token> {
    const user = await this.userRepository.findOne({
      where: {
        email: loginUserDto.email,
      },
    });

    const payload = { id: user.id, email: user.email, name: user.fullName };
    return {
      token: this.jwtService.sign(payload),
    };
  }

  async validateUser(
    email: string,
    password: string,
  ): Promise<Omit<User, 'password'>> {
    const user = await this.userRepository.findOne({
      where: {
        email: email,
      },
    });

    if (!user) {
      return null;
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return null;
    }

    delete user['password'];
    return user;
  }
}
