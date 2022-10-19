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
import { UserService } from '../user/user.service';
import { MinioClientService } from '../minio-client/minio-client.service';
import { GetProfileDto } from './dto';
import { plainToClass } from 'class-transformer';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(Profile)
    private profileRepository: Repository<Profile>,
    private minioClientService: MinioClientService,
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
        ...profile,
      },
      { excludeExtraneousValues: true },
    );

    return response;
  }

  async update(
    userId: string,
    profile: UpdateProfileDto,
    image?: Express.Multer.File,
  ) {
    if (image) {
      const { url: imageUrl } = await this.minioClientService.upload(image);
      const updatedProfile = await this.profileRepository.update(
        {
          userId: userId,
        },
        {
          ...profile,
          avatar: imageUrl,
        },
      );

      if (!updatedProfile.affected) {
        throw new InternalServerErrorException('Update profile failed');
      }

      return await this.findByUserId(userId);
    }

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
}
