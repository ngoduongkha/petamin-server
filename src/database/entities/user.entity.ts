import * as bcrypt from 'bcrypt';
import {
  BeforeInsert,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
} from 'typeorm';
import { Conversation, Message } from '.';
import { UserStatus } from '../enum';
import { BaseEntity } from './base.entity';

@Entity()
export class User extends BaseEntity {
  @Column({ unique: true, type: 'varchar' })
  email: string;

  @Column({
    name: 'name',
    type: 'varchar',
    nullable: false,
  })
  name: string;

  @Column({ type: 'text', select: false, nullable: false })
  password: string;

  @Column({
    name: 'status',
    type: 'enum',
    enum: UserStatus,
    default: UserStatus.INACTIVE,
    nullable: false,
  })
  status: UserStatus;

  // @OneToMany(
  //   () => UserConversation,
  //   (userConversation) => userConversation.user,
  // )
  // userConversation?: UserConversation[];

  @OneToMany(() => Message, (message) => message.user)
  messages?: Message[];

  // @OneToMany(() => Information, (information) => information.user, {
  //   eager: true,
  // })
  // information?: Information[];

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
      this.password = await bcrypt.hash(this.password, 10);
    }
  }

  @BeforeInsert()
  emailToLowerCase() {
    this.email = this.email.toLowerCase();
  }
}
