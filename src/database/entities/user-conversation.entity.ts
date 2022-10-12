import { Conversation, User } from '@entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { IdentityEntity } from './base.entity';

@Entity({ name: 'user_conversation' })
export class UserConversation extends IdentityEntity {
  @Column({ name: 'userId', type: 'uuid' })
  userId: string;

  @ManyToOne(() => User, (user) => user.userConversations)
  user: User;

  @Column({ name: 'conversationId', type: 'uuid' })
  conversationId: string;

  @ManyToOne(
    () => Conversation,
    (conversation) => conversation.userConversations,
  )
  conversation: Conversation;
}
