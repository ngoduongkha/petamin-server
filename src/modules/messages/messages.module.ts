import { JwtModule } from '@nestjs/jwt';
import { JwtConfig } from 'src/config';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Message, User } from 'src/database/entities';
import { PassportModule } from '@nestjs/passport';
import { ConfigType } from '@nestjs/config';
import { MessagesController } from './messages.controller';
import { ConversationModule } from '../conversation/conversation.module';
import { MessagesGateway } from './messages.gateway';
import { MessagesService } from './messages.service';
import { WsJwtStrategy } from '../auth/strategy/ws-jwt.strategy';

@Module({
  imports: [
    ConversationModule,
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
    TypeOrmModule.forFeature([Message, User]),
  ],
  providers: [MessagesGateway, MessagesService, WsJwtStrategy],
  controllers: [MessagesController],
})
export class MessagesModule {}
