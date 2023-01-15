import { Controller, Get, HttpCode, Param, ParseUUIDPipe, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { GetUser } from 'src/common/decorators';
import { FollowsService } from './follows.service';
import { JwtGuard } from '../../common/guard/jwt.guard';
import { GetFollowResponse } from './dto';

@ApiTags('follows')
@ApiBearerAuth('access-token')
@UseGuards(JwtGuard)
@Controller('follows')
export class FollowsController {
  constructor(private readonly followsService: FollowsService) {}

  @Get('/my-followers')
  @ApiOkResponse({ type: [GetFollowResponse] })
  getMyFollowers(@GetUser('id') userId: string): Promise<GetFollowResponse[]> {
    return this.followsService.getFollowers(userId);
  }

  @Get('/my-followings')
  @ApiOkResponse({ type: [GetFollowResponse] })
  getMyFollowings(@GetUser('id') userId: string): Promise<GetFollowResponse[]> {
    return this.followsService.getFollowings(userId);
  }

  @Get('/:userId/followers')
  @ApiOkResponse({ type: [GetFollowResponse] })
  getFollowers(
    @GetUser('id') me: string,
    @Param('userId', new ParseUUIDPipe()) userId: string,
  ): Promise<GetFollowResponse[]> {
    return this.followsService.getFollowers(userId, me);
  }

  @Get('/:userId/followings')
  getFollowings(
    @GetUser('id') me: string,
    @Param('userId', new ParseUUIDPipe()) userId: string,
  ): Promise<GetFollowResponse[]> {
    return this.followsService.getFollowings(userId, me);
  }

  @Post('/:userId/follow')
  follow(
    @GetUser('id') userId: string,
    @Param('userId', new ParseUUIDPipe()) followingId: string,
  ): Promise<void> {
    return this.followsService.follow(userId, followingId);
  }

  @Post('/:userId/unfollow')
  unfollow(
    @GetUser('id') userId: string,
    @Param('userId', new ParseUUIDPipe()) unfollowingId: string,
  ): Promise<void> {
    return this.followsService.unfollow(userId, unfollowingId);
  }

  @HttpCode(200)
  @Post('/:userId/followers/remove')
  removeFollower(
    @GetUser('id') me: string,
    @Param('userId', new ParseUUIDPipe()) userId: string,
  ): Promise<void> {
    return this.followsService.removeFollower(me, userId);
  }
}
