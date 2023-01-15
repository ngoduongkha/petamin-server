import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Conversation } from './conversation.entity';
import { User } from './user.entity';

@Entity({ name: 'user_conversation' })
export class UserConversation {
  @PrimaryColumn({ name: 'user_id' })
  userId: string;

  @ManyToOne(() => User, (user) => user.userConversations)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @PrimaryColumn({ name: 'conversation_id' })
  conversationId: string;

  @ManyToOne(() => Conversation, (conversation) => conversation.userConversations)
  @JoinColumn({ name: 'conversation_id' })
  conversation: Conversation;
}
