import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtConfig } from 'src/config';
import { Repository } from 'typeorm';
import { WsException } from '@nestjs/websockets';
import { User } from 'src/database/entities';
import { AuthPayload } from '../types';

@Injectable()
export class WsJwtStrategy extends PassportStrategy(Strategy, 'ws-jwt') {
  constructor(
    @Inject(JwtConfig.KEY) jwtConfig: ConfigType<typeof JwtConfig>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: jwtConfig.secret,
    });
  }

  async validate(payload: AuthPayload): Promise<User> {
    const { id } = payload;
    try {
      return await this.userRepository.findOneByOrFail({ id });
    } catch (error) {
      throw new WsException('Unauthorized access');
    }
  }
}
