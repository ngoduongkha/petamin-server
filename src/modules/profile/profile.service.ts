import { Profile } from '@entity';
import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateProfileDto } from './dto';
import { UserService } from '../user/user.service';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(Profile)
    private profileRepository: Repository<Profile>,
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

  async update(userId: string, profile: UpdateProfileDto): Promise<Profile> {
    await this.profileRepository.update(
      {
        userId: userId,
      },
      profile,
    );

    return await this.findByUserId(userId);
  }

  async create(userId: string): Promise<void> {
    const profile: Partial<Profile> = {
      userId: userId,
    };

    await this.profileRepository.save(profile);
  }
}
