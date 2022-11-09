import { PetPhoto } from '@entity';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { Pet } from '../../database/entities/pet.entity';
import { PhotoDto, CreatePetDto, UpdatePetDto } from './dto';

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
    return await this.getById(petId);
  }

  async findAll(): Promise<Pet[]> {
    return await this.petRepository.find({
      where: {
        isDeleted: false,
      },
      relations: {
        species: true,
        photos: true,
      },
    });
  }

  async getById(petId: string): Promise<Pet> {
    const pet = await this.petRepository.findOne({
      where: {
        id: petId,
      },
      relations: {
        species: true,
        photos: true,
      },
    });

    if (pet.isDeleted)
      throw new HttpException(
        'This species has been remove',
        HttpStatus.NOT_FOUND,
      );

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

    return await this.getById(petId);
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

  async deletePhotos(petId: string, photoIds: string[]): Promise<void> {
    const deletedPhotos = photoIds.map(async (id) => {
      return await this.petPhotoRepository.delete({
        id: id,
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

    return await this.petPhotoRepository.find({
      where: {
        pet: {
          id: petId,
          isDeleted: false,
        },
      },
    });
  }

  async isAdopting(petId: string): Promise<boolean> {
    const pet = await this.petRepository.findOneBy({ id: petId });

    return pet.isAdopting;
  }

  async changeAdoptionStatus(
    petId: string,
    adoptionStatus: boolean,
  ): Promise<void> {
    await this.petRepository.update(
      {
        id: petId,
      },
      {
        isAdopting: adoptionStatus,
      },
    );
  }
}
