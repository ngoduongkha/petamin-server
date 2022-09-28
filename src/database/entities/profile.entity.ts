import { User } from '@entity';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { EGender, EPosition } from '../enums';
import { BaseEntity } from './base.entity';

@Entity({ name: 'profiles' })
export class Profile extends BaseEntity {
  constructor(partial: Partial<Profile>) {
    super();
    Object.assign(this, partial);
  }

  @Column({ name: 'avatar', nullable: true })
  avatar: string;

  @Column({ name: 'address', nullable: true })
  address: string;

  @Column({ name: 'phone', nullable: true })
  phone: string;

  @Column({ name: 'description', nullable: true })
  description: string;

  @Column({ name: 'gender', nullable: true })
  gender: EGender;

  @Column({ name: 'position', nullable: true })
  position: EPosition;

  @Column({
    name: 'birthday',
    default: null,
    nullable: true,
  })
  birthday: Date;

  @Column({ name: 'user_id', nullable: true })
  userId?: string;

  @OneToOne(() => User, (user) => user.profile)
  @JoinColumn({ name: 'user_id' })
  user: User;
}
