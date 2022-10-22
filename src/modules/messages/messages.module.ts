import { forwardRef, Module } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { MessagesGateway } from './messages.gateway';
import { AppModule } from 'src/app.module';
import { ConversationModule } from '../conversation/conversation.module';
import { InformationModule } from '../information/information.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtModuleAsyncOptions } from '@config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Message, User } from '@entity';
import { PassportModule } from '@nestjs/passport';
import { WsJwtStrategy } from '../auth/strategies/ws-jwt.strategy';

@Module({
  imports: [
    ConversationModule,
    InformationModule,
    PassportModule,
    JwtModule.registerAsync(jwtModuleAsyncOptions),
    TypeOrmModule.forFeature([Message, User]),
  ],
  providers: [MessagesGateway, MessagesService, WsJwtStrategy],
})
export class MessagesModule {}
