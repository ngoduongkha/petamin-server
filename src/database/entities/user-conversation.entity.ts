import { Conversation, User } from '@entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { IdentityEntity } from './base.entity';

@Entity({ name: 'user_conversation' })
export class UserConversation extends IdentityEntity {
  constructor(partial: Partial<UserConversation>) {
    super();
    Object.assign(this, partial);
  }

  @Column({ name: 'last_message_id', nullable: true })
  lastMessageId: number;

  @Column({ name: 'mute', default: false })
  mute: boolean;

  @Column({ name: 'block', default: false })
  block: boolean;

  @Column({ name: 'user_id', nullable: true })
  userId?: string;

  @ManyToOne(() => User, (user) => user.userConversation)
  @JoinColumn({ name: 'user_id' })
  user?: User;

  @Column({ name: 'conversation_id', nullable: true })
  conversationId?: string;

  @ManyToOne(
    () => Conversation,
    (conversation) => conversation.userConversation,
  )
  @JoinColumn({ name: 'conversation_id' })
  conversation?: Conversation;
}
