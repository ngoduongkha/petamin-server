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

  public getCookieForLogOut() {
    return `Authentication=; HttpOnly; Path=/; Max-Age=0`;
  }

  async create(dto: RegisterDto) {
    const user = await this.userService.createUser(dto);

    const payload: AuthPayload = {
      name: user.name,
      email: user.email,
      id: user.id,
    };

    return {
      token: this.jwtService.sign(payload),
      user,
    };
  }

  async login(user: User) {
    const payload: AuthPayload = {
      name: user.name,
      email: user.email,
      id: user.id,
    };

    return {
      token: this.jwtService.sign(payload),
      user,
    };
  }
}
