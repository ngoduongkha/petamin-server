import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Inject, Injectable } from '@nestjs/common';
import { AuthPayload } from '../interface/auth-payload.interface';
import { ConfigType } from '@nestjs/config';
import { JwtConfig } from '@config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    @Inject(JwtConfig.KEY) configService: ConfigType<typeof JwtConfig>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.secret,
    });
  }

  validate(payload: AuthPayload) {
    return { email: payload.email, id: payload.userId };
  }
}
