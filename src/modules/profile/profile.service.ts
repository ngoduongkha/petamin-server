import { Profile } from '@entity';
import {
  forwardRef,
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateProfileDto } from './dto';
import { GetProfileDto } from './dto';
import { plainToClass } from 'class-transformer';
import { S3Service } from '../s3/s3.service';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(Profile)
    private profileRepository: Repository<Profile>,
    private s3Service: S3Service,
  ) {}

  async findByUserId(userId: string): Promise<GetProfileDto> {
    const profile = await this.profileRepository.findOne({
      where: { userId },
      relations: { user: true },
    });

    const response = plainToClass(
      GetProfileDto,
      {
        email: profile.user.email,
        userId: profile.user.id,
        ...profile,
      },
      { excludeExtraneousValues: true },
    );

    return response;
  }

  async update(userId: string, profile: UpdateProfileDto) {
    const updatedProfile = await this.profileRepository.update(
      {
        userId: userId,
      },
      profile,
    );

    if (!updatedProfile.affected) {
      throw new InternalServerErrorException('Update profile failed');
    }

    return await this.findByUserId(userId);
  }

  async updateTotalFollowers(
    userId: string,
    totalFollowers: number,
  ): Promise<void> {
    await this.profileRepository.update(
      { userId },
      {
        totalFollowers,
      },
    );
  }

  async updateTotalFollowings(
    userId: string,
    totalFollowings: number,
  ): Promise<void> {
    await this.profileRepository.update(
      { userId },
      {
        totalFollowings,
      },
    );
  }
}
