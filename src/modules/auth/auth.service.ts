import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { User } from '../../database/entities';
import { UserService } from '../user/user.service';
import { RegisterDto } from './dto/register.dto';
import { AuthPayload } from './interfaces/auth-payload.interface';
import * as argon from 'argon2';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  async authentication(email: string, password: string): Promise<any> {
    const user = await this.userService.getUserByEmailAndGetPassword(email);
    const check = await argon.verify(user.password, password);

    if (!user || !check) {
      return false;
    }

    return user;
  }

  async create(dto: RegisterDto) {
    const user = await this.userService.createUserIfNotExist(dto);

    const payload: AuthPayload = {
      email: user.email,
      userId: user.id,
    };

    return {
      accessToken: this.jwtService.sign(payload),
    };
  }

  async login(user: User) {
    const payload: AuthPayload = {
      email: user.email,
      userId: user.id,
    };

    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
