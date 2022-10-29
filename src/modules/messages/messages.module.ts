import { forwardRef, Module } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { MessagesGateway } from './messages.gateway';
import { ConversationModule } from '../conversation/conversation.module';
import { InformationModule } from '../information/information.module';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Message, User } from '@entity';
import { PassportModule } from '@nestjs/passport';
import { WsJwtStrategy } from '../auth/strategy/ws-jwt.strategy';
import { ConfigType } from '@nestjs/config';
import { JwtConfig } from '@config';

@Module({
  imports: [
    ConversationModule,
    InformationModule,
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
})
export class MessagesModule {}
