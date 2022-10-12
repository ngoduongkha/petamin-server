import { PetPhoto } from '@entity';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { Pet } from '../../database/entities/pet.entity';
import { PhotoDto } from './dto';
import { CreatePetDto } from './dto/create-pet.dto';
import { UpdatePetDto } from './dto/update-pet.dto';

@Injectable()
export class PetService {
  constructor(
    @InjectRepository(Pet)
    private petRepository: Repository<Pet>,

    @InjectRepository(PetPhoto)
    private petPhotoRepository: Repository<PetPhoto>,

    private dataSource: DataSource,
  ) {}

  async create(createPetDto: CreatePetDto): Promise<Pet> {
    const newPet: Pet = this.petRepository.create({
      ...createPetDto,
      species: {
        id: createPetDto.speciesId,
      },
    });
    await this.petRepository.save(newPet);
    return await this.getById(createPetDto.speciesId);
  }

  async findAll(): Promise<Pet[]> {
    return await this.petRepository.find({
      where: {
        isDeleted: false,
      },
      relations: {
        species: true,
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
      species: updatePetDto.speciesId
        ? {
            id: updatePetDto.speciesId,
          }
        : undefined,
    });

    await this.petRepository.update(
      {
        id: petId,
      },
      updatedPet,
    );

    return await this.getById(petId);
  }

  async remove(petId: string): Promise<void> {
    const isExist = await this.existPet(petId);
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

  async existPet(petId: string): Promise<boolean> {
    const pet = await this.petRepository.findOne({
      where: {
        id: petId,
        isDeleted: false,
      },
    });

    if (pet) return true;

    return false;
  }

  async removePhotos(petId: string, photoIds: string[]): Promise<void> {
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
    const isExist = await this.existPet(petId);

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
    const isExist = await this.existPet(petId);
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
}