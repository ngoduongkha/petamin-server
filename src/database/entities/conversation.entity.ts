import { Message, User, UserConversation } from '@entity';
import { Column, Entity, JoinTable, ManyToMany, OneToMany } from 'typeorm';
import { EBackground, EEmoji } from '../enums';
import { BaseEntity } from './base.entity';

@Entity({ name: 'conversations' })
export class Conversation extends BaseEntity {
  @Column({ name: 'title', nullable: true })
  title: string;

  @Column({ name: 'description', nullable: true, length: 5000 })
  description: string;

  @Column({ name: 'background', nullable: true, default: EBackground.white })
  background: EBackground;

  @Column({ name: 'emoji', nullable: true, default: EEmoji.haha })
  emoji: EEmoji;

  @OneToMany(() => Message, (message) => message.conversation)
  messages?: Message[];

  @JoinTable({
    name: 'user-conversation',
    joinColumn: { name: 'conversation_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'user_id' },
  })
  users: User[];

  @OneToMany(
    () => UserConversation,
    (userConversation) => userConversation.conversation,
    { cascade: true },
  )
  public userConversations!: UserConversation[];
}
