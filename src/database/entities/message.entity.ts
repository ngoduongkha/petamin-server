import { Conversation, User } from '@entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity({ name: 'messages' })
export class Message extends BaseEntity {
  constructor(partial: Partial<Message>) {
    super();
    Object.assign(this, partial);
  }

  @Column({ default: false })
  status: boolean;

  @Column({ name: 'message', length: 255 })
  message: string;

  @Column({ name: 'user_id', nullable: true })
  userId?: string;

  @ManyToOne(() => User, (user) => user.messages)
  @JoinColumn({ name: 'user_id' })
  user?: User;

  @Column({ name: 'conversation_id', nullable: true })
  conversationId?: string;

  @ManyToOne(() => Conversation, (conversation) => conversation.messages)
  @JoinColumn({ name: 'conversation_id' })
  conversation?: Conversation;
}
