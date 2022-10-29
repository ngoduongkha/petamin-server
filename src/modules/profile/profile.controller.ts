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
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('image', { fileFilter: imageFileFilter }))
  @ApiBody({ type: UpdateProfileDto })
  async update(
    @GetUser('id') userId: string,
    @Body() updateProfileDto: UpdateProfileDto,
    @UploadedFile()
    file: Express.Multer.File,
  ) {
    return this.profileService.update(userId, updateProfileDto, file);
  }
}
