import { User } from '@entity';
import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Follows } from '../../database/entities/follows.entity';
import { ProfileService } from '../profile/profile.service';
import { GetFollowDto } from './dto';

@Injectable()
export class FollowsService {
  constructor(
    @InjectRepository(Follows)
    private followsRepository: Repository<Follows>,

    @Inject(forwardRef(() => ProfileService))
    private profileService: ProfileService,
  ) {}

  async getFollowers(userId: string, me?: string): Promise<GetFollowDto[]> {
    const follows = await this.followsRepository.find({
      where: { userId },
      relations: ['follower', 'follower.profile'],
    });

    if (!me) {
      const followers = follows.map(({ follower }) => {
        return {
          userId: follower.id,
          email: follower.email,
          ...follower.profile,
        };
      });
      return followers;
    }

    const myFollowings = await this.getFollowings(me);
    const followers = follows.map(({ follower }) => {
      const isFollow = myFollowings.some(
        (following) => following.userId === follower.id,
      );

      return {
        userId: follower.id,
        email: follower.email,
        isFollow,
        ...follower.profile,
      };
    });

    return followers;
  }

  async getFollowings(userId: string): Promise<GetFollowDto[]> {
    const follows = await this.followsRepository.find({
      where: { followerId: userId },
      relations: ['user', 'user.profile'],
    });

    const followings = follows.map((follow) => {
      const { user } = follow;
      return {
        userId: user.id,
        email: user.email,
        isFollow: true,
        ...user.profile,
      };
    });

    return followings;
  }

  async follow(userId: string, followingId: string): Promise<void> {
    if (!userId || !followingId) throw new BadRequestException();

    const follows = this.followsRepository.create({
      followerId: userId,
      userId: followingId,
    });

    await this.followsRepository.save(follows);

    const calcFollowers = this.calcFollowers(followingId);
    const calcFollowings = this.calcFollowings(userId);
    await Promise.all([calcFollowers, calcFollowings]);
  }

  async unfollow(userId: string, unfollowingId: string): Promise<void> {
    if (!userId || !unfollowingId) throw new BadRequestException();

    const follows = await this.followsRepository.findOne({
      where: {
        followerId: userId,
        userId: unfollowingId,
      },
    });

    if (!follows) throw new BadRequestException();

    await this.followsRepository.delete({
      followerId: userId,
      userId: unfollowingId,
    });

    const calcFollowers = this.calcFollowers(unfollowingId);
    const calcFollowings = this.calcFollowings(userId);
    await Promise.all([calcFollowers, calcFollowings]);
  }

  async calcFollowers(userId: string) {
    const totalFollowers = await this.followsRepository.count({
      where: {
        userId: userId,
      },
    });

    await this.profileService.updateTotalFollowers(userId, totalFollowers);
  }

  async calcFollowings(userId: string) {
    const totalFollowings = await this.followsRepository.count({
      where: {
        followerId: userId,
      },
    });

    await this.profileService.updateTotalFollowings(userId, totalFollowings);
  }

  async isFollow(followerId: string, followingId: string) {
    await this.followsRepository.findOneBy({
      userId: followingId,
      followerId,
    });
    const follows = await this.followsRepository.findOneBy({
      userId: followingId,
      followerId,
    });

    if (follows) return true;
    return false;
  }
}
