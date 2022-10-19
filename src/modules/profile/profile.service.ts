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

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(Profile)
    private profileRepository: Repository<Profile>,
    private minioClientService: MinioClientService,
  ) {}

  async findAll() {
    return await this.profileRepository.find({
      where: {
        isDeleted: false,
      },
    });
  }

  async findByUserId(userId: string) {
    const profile = await this.profileRepository.findOneBy({
      userId: userId,
    });

    return profile;
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

  async create(userId: string): Promise<void> {
    const profile: Partial<Profile> = {
      userId: userId,
    };

    await this.profileRepository.save(profile);
  }
}
