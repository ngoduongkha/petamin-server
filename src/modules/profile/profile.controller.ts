import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
  UseGuards
} from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UpdateProfileDto } from './dto';
import { JwtGuard } from '../auth/guard/jwt.guard';
import { GetUser } from '../auth/decorators/get-user.decorator';
import { User } from '@entity';

@ApiTags('profile')
@Controller('profile')
@UseGuards(JwtGuard)
@ApiBearerAuth('access-token')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) { }

  @Get()
  async findAll() {
    return await this.profileService.findAll();
  }

  @Get('me')
  async getMe(@GetUser('id') userId: string) {
    return await this.profileService.findByUserId(userId);
  }


  @Patch()
  async update(@Body() updateProfileDto: UpdateProfileDto, @GetUser('id') userId: string) {
    return await this.profileService.update(userId, updateProfileDto);
  }


}
