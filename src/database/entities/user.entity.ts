import {
  Adoption,
  Conversation,
  Information,
  Message,
  Pet,
  Profile,
  UserConversation,
} from '@entity';
import * as argon from 'argon2';
import {
  AfterLoad,
  BeforeInsert,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { BaseEntity } from './base.entity';
import { Follows } from './follows.entity';

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

  @OneToMany(() => Pet, (pet) => pet.user)
  pets?: Pet[];

  @OneToMany(
    () => UserConversation,
    (userConversation) => userConversation.user,
  )
  userConversations?: UserConversation[];

  @OneToMany(() => Follows, (follows) => follows.user)
  followings?: Follows[];

  @OneToMany(() => Follows, (follows) => follows.follower)
  followers?: Follows[];

  @OneToMany(() => Adoption, (adoption) => adoption.user)
  adoptions?: Adoption[];

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
