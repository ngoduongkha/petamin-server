import { jwtModuleAsyncOptions } from '@config';
import { Message } from '@entity';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConversationModule } from '../conversation/conversation.module';
import { InformationModule } from '../information/information.module';
import { UserConversationModule } from '../user-conversation/user-conversation.module';
import { UserModule } from '../user/user.module';
import { MessageController } from './message.controller';
import { MessageGateway } from './message.gateway';
import { MessageService } from './message.service';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([Message]),
    JwtModule.registerAsync(jwtModuleAsyncOptions),
    UserModule,
    ConversationModule,
    InformationModule,
    UserConversationModule,
  ],
  controllers: [MessageController],
  providers: [MessageService, MessageGateway],
})
export class MessagesModule {}
