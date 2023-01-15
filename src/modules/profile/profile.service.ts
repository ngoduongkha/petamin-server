import { forwardRef, Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Profile } from 'src/database/entities';
import { Repository } from 'typeorm';
import { AdoptionService } from '../adoption/adoption.service';
import { FollowsService } from '../follows/follows.service';
import { PetService } from '../pet/pet.service';
import { GetProfileDto, UpdateProfileDto } from './dto';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(Profile)
    private profileRepository: Repository<Profile>,
    private petService: PetService,
    private adoptionService: AdoptionService,

    @Inject(forwardRef(() => FollowsService))
    private followsService: FollowsService,
  ) {}

  async findByUserId(userId: string, me?: string): Promise<GetProfileDto> {
    const { user, ...profile } = await this.profileRepository.findOneOrFail({
      where: { userId },
      relations: { user: true },
    });

    const pets = await this.petService.findByUserId(userId);

    let isFollow: boolean = false;

    if (me) {
      isFollow = await this.followsService.isFollow(me, userId);
    }

    const adoptions = await this.adoptionService.findByUserId(userId);

    return {
      email: user.email,
      userId: user.id,
      pets,
      adoptions,
      isFollow,
      ...profile,
    };
  }

  async update(userId: string, profile: UpdateProfileDto): Promise<GetProfileDto> {
    const updatedProfile = await this.profileRepository.update({ userId }, profile);

    if (!updatedProfile.affected) {
      throw new InternalServerErrorException('Update profile failed');
    }

    return this.findByUserId(userId);
  }

  async updateTotalFollowers(userId: string, totalFollowers: number): Promise<void> {
    await this.profileRepository.update(
      { userId },
      {
        totalFollowers,
      },
    );
  }

  async updateTotalFollowings(userId: string, totalFollowings: number): Promise<void> {
    await this.profileRepository.update(
      { userId },
      {
        totalFollowings,
      },
    );
  }
}
