import { registerAs } from '@nestjs/config';

export const JwtConfig = registerAs('jwt', () => ({
  secret: process.env.JWT_SECRET || 'jwtSecret',
  expiresIn: process.env.ACCESS_TOKEN_EXPIRATION || '24h',
}));
