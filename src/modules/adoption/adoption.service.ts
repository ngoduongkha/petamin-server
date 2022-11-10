import { Adoption } from '@entity';
import {
  Injectable,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAdoptionDto, UpdateAdoptionDto } from './dto';
import { PetService } from '../pet/pet.service';
import { AdoptionStatus } from 'src/database/enums';

@Injectable()
export class AdoptionService {
  constructor(
    @InjectRepository(Adoption)
    private adoptionRepository: Repository<Adoption>,
    private petService: PetService,
  ) {}

  async create(userId: string, createAdoptionDto: CreateAdoptionDto) {
    console.log('createAdoptionDto :>> ', createAdoptionDto);
    const isAdopting = await this.petService.isAdopting(
      createAdoptionDto.petId,
    );
    console.log('isAdopting :>> ', isAdopting);
    if (isAdopting)
      throw new InternalServerErrorException('This pet is already adoption');

    const adoption = this.adoptionRepository.create({
      userId,
      ...createAdoptionDto,
      status: AdoptionStatus.SHOW,
      pet: {
        id: createAdoptionDto.petId,
      },
    });

    const { id: adoptionId } = await this.adoptionRepository.save(adoption);
    await this.petService.changeAdoptionStatus(createAdoptionDto.petId, true);

    return await this.findById(adoptionId);
  }

  async findAll(): Promise<Adoption[]> {
    const adoptions = await this.adoptionRepository.find({
      where: {
        isDeleted: false,
        status: AdoptionStatus.SHOW,
      },
      relations: {
        pet: true,
      },
    });

    return adoptions;
  }

  async findById(adoptionId: string): Promise<Adoption> {
    const adoption = await this.adoptionRepository.findOne({
      where: {
        id: adoptionId,
        isDeleted: false,
      },
      relations: {
        pet: true,
        user: true,
      },
    });

    if (!adoption) throw new InternalServerErrorException('adoption not found');

    return adoption;
  }

  async findByUserId(userId: string): Promise<Adoption[]> {
    const adoptions = await this.adoptionRepository.find({
      where: {
        isDeleted: false,
        user: {
          id: userId,
        },
      },
      relations: {
        pet: true,
      },
    });

    return adoptions;
  }

  async findByPetId(petId: string): Promise<Adoption> {
    const adoption = await this.adoptionRepository.findOneBy({
      petId,
      isDeleted: false,
    });

    return adoption;
  }

  async update(
    adoptionId: string,
    updateAdoptionDto: UpdateAdoptionDto,
  ): Promise<void> {
    await this.adoptionRepository.update(
      {
        id: adoptionId,
      },
      {
        ...updateAdoptionDto,
      },
    );
  }

  async delete(adoptionId: string): Promise<void> {
    await this.adoptionRepository.update(
      {
        id: adoptionId,
      },
      {
        isDeleted: true,
      },
    );
  }

  async updateStatus(
    adoptionId: string,
    status: AdoptionStatus,
  ): Promise<void> {
    const { pet } = await this.findById(adoptionId);
    await this.adoptionRepository.update(
      {
        id: adoptionId,
      },
      {
        status,
      },
    );

    const petAdoptingStatus = status === AdoptionStatus.SHOW ? true : false;
    await this.petService.changeAdoptionStatus(pet.id, petAdoptingStatus);
  }

  // async existsAdoptionShowWithPet(petId: string): Promise<boolean> {
  //   const adoption = await this.adoptionRepository.findOne({
  //     where: {
  //       pet: {
  //         id: petId,
  //       },
  //       status: AdoptionStatus.SHOW,
  //     },
  //   });

  //   if (adoption) return true;

  //   return false;
  // }
}
