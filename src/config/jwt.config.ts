import { ConfigType, registerAs } from '@nestjs/config';
import { JwtModuleAsyncOptions } from '@nestjs/jwt';

export const JwtConfig = registerAs('jwt', () => ({
  jwtSecret: process.env.JWT_SECRET || 'jwtSecret',
  accessTokenExpiration: process.env.ACCESS_TOKEN_EXPIRATION,
}));

export const jwtModuleAsyncOptions: JwtModuleAsyncOptions = {
  inject: [JwtConfig.KEY],
  useFactory: (configService: ConfigType<typeof JwtConfig>) => {
    return {
      secret: configService.jwtSecret,
      signOptions: {
        expiresIn: configService.accessTokenExpiration,
      },
    };
  },
};
