import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Pet, PetPhoto } from 'src/database/entities';
import { Repository } from 'typeorm';
import { PhotoDto, CreatePetDto, UpdatePetDto, DeletePetPhotoDto } from './dto';

@Injectable()
export class PetService {
  constructor(
    @InjectRepository(Pet)
    private petRepository: Repository<Pet>,

    @InjectRepository(PetPhoto)
    private petPhotoRepository: Repository<PetPhoto>,
  ) {}

  async create(createPetDto: CreatePetDto, ownerId: string): Promise<Pet> {
    const newPet: Pet = this.petRepository.create({
      ...createPetDto,
      user: {
        id: ownerId,
      },
    });
    const { id: petId } = await this.petRepository.save(newPet);
    return this.getById(petId);
  }

  async findByUserId(userId: string): Promise<Pet[]> {
    return this.petRepository.find({
      where: {
        isDeleted: false,
        isAdopting: false,
        userId,
      },
      relations: {
        photos: true,
      },
    });
  }

  async getById(petId: string): Promise<Pet> {
    const pet = await this.petRepository.findOneOrFail({
      where: {
        id: petId,
      },
      relations: {
        photos: true,
      },
    });

    if (pet.isDeleted) {
      throw new NotFoundException('This species has been remove');
    }

    return pet;
  }

  async update(petId: string, updatePetDto: UpdatePetDto): Promise<Pet> {
    const updatedPet: Pet = this.petRepository.create({
      ...updatePetDto,
    });

    await this.petRepository.update(
      {
        id: petId,
      },
      updatedPet,
    );

    return this.getById(petId);
  }

  async delete(petId: string): Promise<void> {
    const isExist = await this.existsPet(petId);
    if (!isExist) return;

    await this.petRepository.update(
      {
        id: petId,
      },
      {
        isDeleted: true,
      },
    );
  }

  async existsPet(petId: string): Promise<boolean> {
    const pet = await this.petRepository.findOne({
      where: {
        id: petId,
        isDeleted: false,
      },
    });

    if (pet) return true;

    return false;
  }

  async deletePhotos(petId: string, dto: DeletePetPhotoDto): Promise<void> {
    const deletedPhotos = dto.photoIds.map(async (id) => {
      return this.petPhotoRepository.delete({
        id,
        pet: {
          id: petId,
        },
      });
    });

    await Promise.all(deletedPhotos);
  }

  async addPhotos(petId: string, photos: PhotoDto[]): Promise<void> {
    const isExist = await this.existsPet(petId);

    if (!isExist) {
      throw new HttpException('Pet not found', HttpStatus.NOT_FOUND);
    }

    const photosCreate: PetPhoto[] = photos.map((photo) => {
      return this.petPhotoRepository.create({
        ...photo,
        pet: {
          id: petId,
        },
      });
    });

    await this.petPhotoRepository.save(photosCreate);
  }

  async getPetPhotos(petId: string): Promise<PetPhoto[]> {
    const isExist = await this.existsPet(petId);
    if (!isExist) {
      throw new HttpException('Pet not found', HttpStatus.NOT_FOUND);
    }

    return this.petPhotoRepository.find({
      where: {
        pet: {
          id: petId,
          isDeleted: false,
        },
      },
    });
  }

  async isAdopting(petId: string): Promise<boolean> {
    const pet = await this.petRepository.findOneByOrFail({ id: petId });

    return pet.isAdopting;
  }

  async changeAdoptionStatus(petId: string, adoptionStatus: boolean): Promise<void> {
    await this.petRepository.update(
      {
        id: petId,
      },
      {
        isAdopting: adoptionStatus,
      },
    );
  }

  async transferToUser(userId: string, petId: string): Promise<void> {
    await this.petRepository.update(
      {
        id: petId,
      },
      {
        userId,
        isAdopting: false,
      },
    );
  }
}
