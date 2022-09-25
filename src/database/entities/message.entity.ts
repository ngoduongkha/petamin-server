import { Column, Entity, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity, Conversation, User } from '.';

@Entity({ name: 'messages' })
export class Message extends BaseEntity {
  @Column({ name: 'conversation_id', nullable: true })
  conversation_id: number;

  @Column({ name: 'user_id', nullable: true })
  user_id: number;

  @Column({ default: false })
  status: boolean;

  @Column({ name: 'message', length: 255 })
  message: string;

  @ManyToOne(() => User, (user) => user.messages)
  @JoinColumn({ name: 'user_id' })
  user?: User;

  @ManyToOne(() => Conversation, (conversation) => conversation.messages)
  @JoinColumn({ name: 'conversation_id' })
  conversation?: Conversation;
}
