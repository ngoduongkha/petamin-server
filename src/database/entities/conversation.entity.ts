import { Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToMany, OneToOne } from 'typeorm';
import { Background, Emoji } from '../enums';
import { BaseEntity } from './base.entity';
import { Message } from './message.entity';
import { UserConversation } from './user-conversation.entity';
import { User } from './user.entity';

@Entity({ name: 'conversations' })
export class Conversation extends BaseEntity {
  @Column({ name: 'title', nullable: true })
  title: string;

  @Column({ name: 'description', nullable: true, length: 5000 })
  description: string;

  @Column({ name: 'background', nullable: true, default: Background.WHITE })
  background: Background;

  @Column({ name: 'emoji', nullable: true, default: Emoji.LIKE })
  emoji: Emoji;

  @OneToMany(() => Message, (message) => message.conversation)
  messages?: Message[];

  @OneToMany(() => UserConversation, (userConversation) => userConversation.conversation, {
    cascade: ['insert'],
  })
  userConversations!: UserConversation[];

  @ManyToMany(() => User, (users) => users.conversations)
  @JoinTable({
    name: 'user_conversation',
    joinColumn: { name: 'conversation_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'user_id' },
  })
  users: User[];

  @Column({ name: 'last_message_id', nullable: true })
  lastMessageId: string;

  @OneToOne(() => Message, {
    nullable: true,
  })
  @JoinColumn({ name: 'last_message_id' })
  lastMessage: Message;
}
