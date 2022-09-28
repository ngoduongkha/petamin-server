import { UserConversation } from '@entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserConversationController } from './user-conversation.controller';
import { UserConversationService } from './user-conversation.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserConversation])],
  controllers: [UserConversationController],
  providers: [UserConversationService],
})
export class UserConversationModule {}
