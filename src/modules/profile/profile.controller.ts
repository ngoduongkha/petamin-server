import { Body, Controller, Get, Param, ParseUUIDPipe, Patch, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOkResponse, ApiResponse, ApiTags } from '@nestjs/swagger';
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
  getMe(@GetUser('id') userId: string): Promise<GetProfileDto> {
    return this.profileService.findByUserId(userId);
  }

  @Patch()
  @ApiBody({ type: UpdateProfileDto })
  @ApiResponse({ type: GetProfileDto })
  update(
    @GetUser('id') userId: string,
    @Body() updateProfileDto: UpdateProfileDto,
  ): Promise<GetProfileDto> {
    return this.profileService.update(userId, updateProfileDto);
  }

  @Get(':userId')
  @ApiOkResponse({ type: GetProfileDto })
  getByUserId(
    @GetUser('id') me: string,
    @Param('userId', new ParseUUIDPipe()) userId: string,
  ): Promise<GetProfileDto> {
    return this.profileService.findByUserId(userId, me);
  }
}
