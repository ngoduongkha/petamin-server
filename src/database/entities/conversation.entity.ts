import { Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToMany, OneToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Message } from './message.entity';
import { UserConversation } from './user-conversation.entity';
import { User } from './user.entity';

@Entity()
export class Conversation extends BaseEntity {
  @OneToMany(() => Message, (message) => message.conversation)
  messages?: Message[];

  @OneToMany(() => UserConversation, (userConversation) => userConversation.conversation, {
    cascade: ['insert'],
  })
  userConversations?: UserConversation[];

  @ManyToMany(() => User, (users) => users.conversations)
  @JoinTable({
    name: 'user_conversation',
    joinColumn: { name: 'conversation_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'user_id' },
  })
  users?: User[];

  @Column({ type: 'uuid', nullable: true })
  lastMessageId: string | null;

  @OneToOne(() => Message, {
    nullable: true,
  })
  @JoinColumn({ name: 'last_message_id' })
  lastMessage?: Message;
}
