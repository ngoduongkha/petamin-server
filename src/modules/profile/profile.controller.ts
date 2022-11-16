import { Body, Controller, Get, Param, Patch, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { GetUser } from '../../common/decorators/get-user.decorator';
import { JwtGuard } from '../../common/guard/jwt.guard';
import { GetProfileDto, UpdateProfileDto } from './dto';
import { ProfileService } from './profile.service';

@ApiTags('profile')
@Controller('profile')
@UseGuards(JwtGuard)
@ApiBearerAuth('access-token')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get()
  @ApiOkResponse({ type: GetProfileDto })
  async getMe(@GetUser('id') userId: string): Promise<GetProfileDto> {
    return await this.profileService.findByUserId(userId);
  }

  @Patch()
  @ApiBody({ type: UpdateProfileDto })
  async update(
    @GetUser('id') userId: string,
    @Body() updateProfileDto: UpdateProfileDto,
  ) {
    return this.profileService.update(userId, updateProfileDto);
  }

  @Get(':userId')
  @ApiOkResponse({ type: GetProfileDto })
  async getByUserId(
    @GetUser('id') me: string,
    @Param('userId') userId: string,
  ): Promise<GetProfileDto> {
    return await this.profileService.findByUserId(userId, me);
  }
}
