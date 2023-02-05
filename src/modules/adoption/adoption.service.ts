import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Adoption } from 'src/database/entities';
import { AdoptionStatus } from 'src/database/enums';
import { Repository } from 'typeorm';
import { FilterOperator, paginate, Paginated, PaginateQuery } from 'nestjs-paginate';
import { CreateAdoptionDto, UpdateAdoptionDto } from './dto';
import { PetService } from '../pet/pet.service';

@Injectable()
export class AdoptionService {
  constructor(
    @InjectRepository(Adoption)
    private adoptionRepository: Repository<Adoption>,
    private petService: PetService,
  ) {}

  async create(userId: string, createAdoptionDto: CreateAdoptionDto): Promise<Adoption> {
    const isAdopting = await this.petService.isAdopting(createAdoptionDto.petId);

    if (isAdopting) throw new InternalServerErrorException('This pet is already adoption');

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

    return this.findById(adoptionId);
  }

  async findAll(query: PaginateQuery): Promise<Paginated<Adoption>> {
    const adoptions = await paginate(query, this.adoptionRepository, {
      sortableColumns: ['price', 'pet.name'],
      nullSort: 'last',
      searchableColumns: ['pet.breed', 'pet.name'],
      defaultSortBy: [['createdAt', 'DESC']],
      filterableColumns: {
        'pet.species': [FilterOperator.IN],
        price: [FilterOperator.BTW],
      },

      where: {
        isDeleted: false,
        status: AdoptionStatus.SHOW,
      },
      relations: ['pet'],
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

  async findByUserId(userId: string, isMe: boolean = false): Promise<Adoption[]> {
    // Only get adoption has status set 'SHOW' if not user logged in
    const status = isMe ? undefined : AdoptionStatus.SHOW;

    const adoptions = await this.adoptionRepository.find({
      where: {
        isDeleted: false,
        user: {
          id: userId,
        },
        status,
      },
      relations: {
        pet: true,
      },
    });

    return adoptions;
  }

  async findByPetId(petId: string): Promise<Adoption> {
    const adoption = await this.adoptionRepository.findOneByOrFail({
      petId,
      isDeleted: false,
    });

    return adoption;
  }

  async update(adoptionId: string, updateAdoptionDto: UpdateAdoptionDto): Promise<void> {
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

    const { petId } = await this.findById(adoptionId);
    await this.petService.changeAdoptionStatus(petId, false);
  }

  async updateStatus(adoptionId: string, status: AdoptionStatus): Promise<void> {
    const { pet } = await this.findById(adoptionId);
    await this.adoptionRepository.update(
      {
        id: adoptionId,
      },
      {
        status,
      },
    );

    // const petAdoptingStatus = status === AdoptionStatus.SHOW;
    // await this.petService.changeAdoptionStatus(pet!.id, petAdoptingStatus);
  }

  async deleteByPetId(petId: string): Promise<void> {
    await this.adoptionRepository.update(
      {
        petId,
      },
      {
        isDeleted: true,
      },
    );

  }
}
