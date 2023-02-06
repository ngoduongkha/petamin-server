import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { MessageType } from '../enums/message-type';
import { BaseEntity } from './base.entity';
import { Conversation } from './conversation.entity';
import { User } from './user.entity';

@Entity({ name: 'messages' })
export class Message extends BaseEntity {
  @Column({ default: false })
  status: boolean;

  @Column({ name: 'message', nullable: true })
  message: string;

  @Column({ name: 'type', type: 'enum', enum: MessageType })
  type: MessageType;

  @Column({ name: 'user_id', nullable: true })
  userId?: string;

  @ManyToOne(() => User, (user) => user.messages)
  @JoinColumn({ name: 'user_id' })
  user?: User;

  @Column({ name: 'conversation_id' })
  conversationId: string;

  @ManyToOne(() => Conversation, (conversation) => conversation.messages)
  @JoinColumn({ name: 'conversation_id' })
  conversation?: Conversation;
}
