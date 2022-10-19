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
  OneToMany,
  OneToOne,
} from 'typeorm';
import { EUserStatus } from '../enums';
import { BaseEntity } from './base.entity';

@Entity({ name: 'users' })
export class User extends BaseEntity {
  constructor(patial: Partial<User>) {
    super();
    Object.assign(this, patial);
  }

  @Column({ unique: true, type: 'varchar' })
  email: string;

  @Column({ type: 'text', select: false, nullable: false })
  password: string;

  @Column({
    name: 'status',
    type: 'enum',
    enum: EUserStatus,
    default: EUserStatus.INACTIVE,
    nullable: false,
  })
  status: EUserStatus;

  @JoinTable({
    name: 'participants',
    joinColumn: { name: 'user_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'conversation_id' },
  })
  conversations: Conversation[];

  @OneToMany(() => Message, (message) => message.user)
  messages?: Message[];

  @OneToOne(() => Profile, (profile) => profile.user, { cascade: true })
  profile: Profile;

  @OneToMany(() => Information, (information) => information.user, {
    eager: true,
  })
  information?: Information[];

  @OneToMany(
    () => UserConversation,
    (userConversation) => userConversation.user,
  )
  userConversations!: UserConversation[];

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
