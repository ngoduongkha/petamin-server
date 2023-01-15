import * as argon from 'argon2';
import { BeforeInsert, Column, Entity, JoinTable, ManyToMany, OneToMany, OneToOne } from 'typeorm';
import { Adoption } from './adoption.entity';
import { BaseEntity } from './base.entity';
import { Conversation } from './conversation.entity';
import { Follows } from './follows.entity';
import { Message } from './message.entity';
import { Pet } from './pet.entity';
import { Profile } from './profile.entity';
import { Transaction } from './transaction.entity';
import { UserConversation } from './user-conversation.entity';

@Entity({ name: 'users' })
export class User extends BaseEntity {
  constructor(partial: Partial<User>) {
    super();
    Object.assign(this, partial);
  }

  @Column({ unique: true, type: 'varchar' })
  email: string;

  @Column({ type: 'text', select: false, nullable: false })
  password: string;

  @OneToMany(() => Message, (message) => message.user)
  messages?: Message[];

  @OneToOne(() => Profile, (profile) => profile.user, {
    cascade: true,
    eager: true,
  })
  profile: Profile;

  @OneToMany(() => Pet, (pet) => pet.user)
  pets?: Pet[];

  @OneToMany(() => UserConversation, (userConversation) => userConversation.user)
  userConversations?: UserConversation[];

  @OneToMany(() => Follows, (follows) => follows.user)
  followings?: Follows[];

  @OneToMany(() => Follows, (follows) => follows.follower)
  followers?: Follows[];

  @OneToMany(() => Adoption, (adoption) => adoption.user)
  adoptions?: Adoption[];

  @OneToMany(() => Transaction, (transaction) => transaction.vendor)
  vendorTransactions?: Transaction[];

  @OneToMany(() => Transaction, (transaction) => transaction.receiver)
  receiverTransactions?: Transaction[];

  @ManyToMany(() => Conversation, (conversations) => conversations.users)
  @JoinTable({
    name: 'user_conversation',
    joinColumn: { name: 'user_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'conversation_id' },
  })
  conversations: Conversation[];

  @BeforeInsert()
  async hashPassword(): Promise<void> {
    if (this.password) {
      this.password = await argon.hash(this.password);
    }
  }

  @BeforeInsert()
  emailToLowerCase(): void {
    this.email = this.email.toLowerCase();
  }
}
