import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { User } from './user.entity';

@Entity({ name: 'follows' })
export class Follows {
  @PrimaryColumn({ name: 'user_id' })
  userId: string;

  @ManyToOne(() => User, (user) => user.followers)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @PrimaryColumn({ name: 'follower_id' })
  followerId: string;

  @ManyToOne(() => User, (user) => user.followings)
  @JoinColumn({ name: 'follower_id' })
  follower: User;
}
