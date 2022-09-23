import { registerAs } from '@nestjs/config';

const JwtConfig = registerAs('jwt', () => ({
  jwtSecret: process.env.JWT_SECRET || 'jwtSecret',
  accessTokenExpiration: process.env.ACCESS_TOKEN_EXPIRATION,
}));

export default JwtConfig;
