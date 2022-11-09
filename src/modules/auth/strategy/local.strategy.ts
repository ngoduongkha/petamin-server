import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'email',
      passwordField: 'password',
    });
  }

  async validate(email: string, password: string) {
    console.log('{email,password} :>> ', { email, password });
    const user = await this.authService.authentication(email, password);
    console.log('user :>> ', user);
    if (!user) {
      throw new UnauthorizedException('not allow');
    }

    return user;
  }
}
