import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Inject, Injectable } from '@nestjs/common';
import { AuthPayload } from '../interfaces/auth-payload.interface';
import { ConfigType } from '@nestjs/config';
import { JwtConfig } from '@config';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '@entity';
import { Repository } from 'typeorm';
import { WsException } from '@nestjs/websockets';

@Injectable()
export class WsJwtStrategy extends PassportStrategy(Strategy, 'wsjwt') {
  constructor(
    @Inject(JwtConfig.KEY) jwtConfig: ConfigType<typeof JwtConfig>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: jwtConfig.jwtSecret,
    });
  }

  async validate(payload: AuthPayload): Promise<User> {
    const { userId } = payload;
    try {
      return this.userRepository.findOneByOrFail({ id: userId });
    } catch (error) {
      throw new WsException('Unauthorized access');
    }
  }
}
