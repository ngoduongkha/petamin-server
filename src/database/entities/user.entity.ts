import {
  Conversation,
  Information,
  Message,
  Profile,
  UserConversation,
} from '@entity';
import * as argon from 'argon2';
import {
  BeforeInsert,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity({ name: 'users' })
export class User extends BaseEntity {
  @Column({ unique: true, type: 'varchar' })
  email: string;

  @Column({ type: 'text', select: false, nullable: false })
  password: string;

  @OneToMany(() => Message, (message) => message.user)
  messages?: Message[];

  @OneToOne(() => Profile, (profile) => profile.user, { cascade: true })
  profile: Profile;

  @OneToMany(() => Information, (information) => information.user)
  information?: Information[];

  @OneToMany(
    () => UserConversation,
    (userConversation) => userConversation.user,
    { eager: true },
  )
  userConversations?: UserConversation[];

  @ManyToMany(() => Conversation, (conversations) => conversations.users)
  @JoinTable({
    name: 'user_conversation',
    joinColumn: { name: 'user_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'conversation_id' },
  })
  conversations: Conversation[];

  @BeforeInsert()
  async hashPassword() {
    if (this.password) {
      this.password = await argon.hash(this.password);
    }
  }

  @BeforeInsert()
  emailToLowerCase() {
    this.email = this.email.toLowerCase();
  }
}
