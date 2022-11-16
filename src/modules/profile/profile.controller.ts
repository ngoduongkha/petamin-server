import {
  Controller,
  Get,
  Body,
  Patch,
  UseInterceptors,
  UploadedFile,
  ParseFilePipe,
  FileTypeValidator,
  Post,
  UseGuards,
  Param,
} from '@nestjs/common';
import { ProfileService } from './profile.service';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOkResponse,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { GetProfileDto, UpdateProfileDto } from './dto';
import { JwtGuard } from '../../common/guard/jwt.guard';
import { GetUser } from '../../common/decorators/get-user.decorator';
import { User } from '@entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { imageFileFilter } from 'src/common/utils/file-filter';

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
