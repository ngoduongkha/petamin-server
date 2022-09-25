import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { ConfigType } from '@nestjs/config';
import JwtConfig from '../../config/jwt.config';
import { UserModule } from '../users/user.module';
import { JwtStrategy, LocalStrategy } from './strategies';
import { UserService } from '../users/user.service';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../database/entities';

@Module({
  imports: [
    PassportModule,
    TypeOrmModule.forFeature([User]),
    JwtModule.registerAsync({
      inject: [JwtConfig.KEY],
      useFactory: (configService: ConfigType<typeof JwtConfig>) => {
        return {
          secret: configService.jwtSecret,
          signOptions: {
            expiresIn: configService.accessTokenExpiration,
          },
        };
      },
    }),
    UserModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, UserService, JwtStrategy, LocalStrategy],
})
export class AuthModule {}
