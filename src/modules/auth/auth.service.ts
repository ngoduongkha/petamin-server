import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as argon from 'argon2';
import { UserService } from '../user/user.service';
import { LoginResponse, RegisterDto } from './dto';
import { AuthPayload } from './types';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService, private readonly userService: UserService) {}

  async validate(email: string, password: string): Promise<AuthPayload | null> {
    const user = await this.userService.getUserByEmailAndGetPassword(email);
    const check = await argon.verify(user.password, password);

    if (!user || !check) {
      return null;
    }

    return { id: user.id };
  }

  async create(dto: RegisterDto): Promise<LoginResponse> {
    const { id } = await this.userService.createUserIfNotExist(dto);

    const payload: AuthPayload = {
      id,
    };

    return {
      accessToken: this.jwtService.sign(payload),
    };
  }

  async login(userId: string): Promise<LoginResponse> {
    const payload: AuthPayload = {
      id: userId,
    };

    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
