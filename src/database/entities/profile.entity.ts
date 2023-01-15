import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { Gender } from '../enums';
import { BaseEntity } from './base.entity';
import { User } from './user.entity';

@Entity({ name: 'profiles' })
export class Profile extends BaseEntity {
  constructor(partial: Partial<Profile>) {
    super();
    Object.assign(this, partial);
  }

  @Column({
    name: 'name',
    type: 'varchar',
    nullable: false,
  })
  name: string;

  @Column({ name: 'avatar', nullable: true })
  avatar: string;

  @Column({ name: 'address', nullable: true })
  address: string;

  @Column({ name: 'phone', nullable: true })
  phone: string;

  @Column({ name: 'bio', nullable: true })
  bio: string;

  @Column({ name: 'gender', type: 'enum', enum: Gender, default: Gender.MALE })
  gender: Gender;

  @Column({
    name: 'birthday',
    default: null,
    nullable: true,
    type: 'timestamptz',
  })
  birthday: Date;

  @Column({ name: 'user_id', nullable: true, select: false })
  userId?: string;

  @OneToOne(() => User, (user) => user.profile)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ name: 'total_followers', nullable: false, default: 0 })
  totalFollowers: number;

  @Column({ name: 'total_followings', nullable: false, default: 0 })
  totalFollowings: number;
}
