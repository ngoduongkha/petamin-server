import { Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { GetUser } from 'src/common/decorators';
import { FollowsService } from './follows.service';
import { JwtGuard } from '../../common/guard/jwt.guard';

@ApiTags('follows')
@ApiBearerAuth('access-token')
@UseGuards(JwtGuard)
@Controller('follows')
export class FollowsController {
  constructor(private readonly followsService: FollowsService) {}

  @Get('my-followers')
  async getMyFollowers(@GetUser('id') userId: string) {
    return await this.followsService.getFollowers(userId);
  }

  @Get('my-followings')
  async getMyFollowings(@GetUser('id') userId: string) {
    return await this.followsService.getFollowings(userId);
  }

  @Get(':userId/followers')
  async getFollowers(
    @Param('userId') userId: string,
    @GetUser('id') me: string,
  ) {
    return await this.followsService.getFollowers(userId, me);
  }

  @Get(':userId/followings')
  async getFollowings(
    @Param('userId') userId: string,
    @GetUser('id') me: string,
  ) {
    return await this.followsService.getFollowings(userId, me);
  }

  @Post(':userId/follow')
  async follow(
    @GetUser('id') userId: string,
    @Param('userId') followingId: string,
  ) {
    await this.followsService.follow(userId, followingId);
  }

  @Post(':userId/unfollow')
  async unfollow(
    @GetUser('id') userId: string,
    @Param('userId') unfollowingId: string,
  ) {
    await this.followsService.unfollow(userId, unfollowingId);
  }
}
