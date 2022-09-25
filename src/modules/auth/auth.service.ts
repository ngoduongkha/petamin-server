import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from '../../database/entities';
import { UserService } from '../users/user.service';
import { AuthPayload } from './interfaces/auth-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}
  async authentication(email: string, password: string): Promise<any> {
    const user = await this.userService.getUserByEmail(email);
    const check = await bcrypt.compare(password, user.password);

    if (!user || !check) {
      return false;
    }

    return user;
  }

  public getCookieForLogOut() {
    return `Authentication=; HttpOnly; Path=/; Max-Age=0`;
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
