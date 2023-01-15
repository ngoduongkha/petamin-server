import { BadRequestException, forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Follows } from '../../database/entities/follows.entity';
import { ProfileService } from '../profile/profile.service';
import { GetFollowResponse } from './dto';

@Injectable()
export class FollowsService {
  constructor(
    @InjectRepository(Follows)
    private followsRepository: Repository<Follows>,

    @Inject(forwardRef(() => ProfileService))
    private profileService: ProfileService,
  ) {}

  async getFollowers(userId: string, me?: string): Promise<GetFollowResponse[]> {
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
      const isFollow = myFollowings.some((following) => following.userId === follower.id);

      return {
        userId: follower.id,
        email: follower.email,
        isFollow,
        ...follower.profile,
      };
    });

    return followers;
  }

  async getFollowings(userId: string, me?: string): Promise<GetFollowResponse[]> {
    const follows = await this.followsRepository.find({
      where: { followerId: userId },
      relations: ['user', 'user.profile'],
    });

    // followings of user logged in
    if (!me) {
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

    const myFollowings = await this.getFollowings(me);
    const followings = follows.map(({ user }) => {
      const isFollow = myFollowings.some((following) => following.userId === user.id);

      return {
        userId: user.id,
        email: user.email,
        isFollow,
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

  async calcFollowers(userId: string): Promise<void> {
    const totalFollowers = await this.followsRepository.count({
      where: { userId },
    });

    await this.profileService.updateTotalFollowers(userId, totalFollowers);
  }

  async calcFollowings(userId: string): Promise<void> {
    const totalFollowings = await this.followsRepository.count({
      where: {
        followerId: userId,
      },
    });

    await this.profileService.updateTotalFollowings(userId, totalFollowings);
  }

  async isFollow(followerId: string, followingId: string): Promise<boolean> {
    const isFollowed = await this.followsRepository.findOneBy({
      userId: followingId,
      followerId,
    });

    return !!isFollowed;
  }

  async removeFollower(me: string, followerId: string): Promise<void> {
    const isFollow = await this.isFollow(followerId, me);

    if (!isFollow) {
      throw new BadRequestException('Cannot remove user not following you');
    }

    await this.followsRepository.delete({
      userId: me,
      followerId,
    });
  }
}
