import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategy/jwt.strategy';
import { LocalStrategy } from './strategy/local.strategy';
import { UserModule } from '../user/user.module';
import { ConfigType } from '@nestjs/config';
import { JwtConfig } from '@config';

@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      inject: [JwtConfig.KEY],
      useFactory: (jwtConfig: ConfigType<typeof JwtConfig>) => {
        return {
          secret: jwtConfig.secret,
          signOptions: {
            expiresIn: jwtConfig.expiresIn,
          },
        };
      },
    }),
    forwardRef(() => UserModule),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, LocalStrategy],
})
export class AuthModule {}
