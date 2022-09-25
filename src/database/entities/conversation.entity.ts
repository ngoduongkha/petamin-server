import { Column, Entity, ManyToMany, JoinTable, OneToMany } from 'typeorm';
import { BaseEntity, Message, User } from '.';
import { Backgrounds, Emojis } from '../enum';

@Entity({ name: 'conversations' })
export class Conversation extends BaseEntity {
  @Column({ name: 'title', nullable: true })
  title: string;

  @Column({ name: 'description', nullable: true, length: 5000 })
  description: string;

  @Column({ name: 'background', nullable: true, default: 'white' })
  background: Backgrounds;

  @Column({ name: 'emoji', nullable: true, default: 'white' })
  emoji: Emojis;

  @OneToMany(() => Message, (message) => message.conversation)
  messages?: Message[];

  //   @OneToMany(
  //     () => UserConversation,
  //     (userConversation) => userConversation.conversation,
  //   )
  //   userConversation?: UserConversation[];

  @ManyToMany(() => User, (users) => users.conversations)
  @JoinTable({
    name: 'user_conversation',
    joinColumn: { name: 'conversation_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'user_id' },
  })
  users: User[];
}
