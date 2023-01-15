import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Follows {
  @PrimaryColumn()
  userId: string;

  @ManyToOne(() => User, (user) => user.followers)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @PrimaryColumn()
  followerId: string;

  @ManyToOne(() => User, (user) => user.followings)
  @JoinColumn({ name: 'follower_id' })
  follower: User;
}
