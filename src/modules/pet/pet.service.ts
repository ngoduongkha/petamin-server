import { PetPhoto } from '@entity';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { Pet } from '../../database/entities/pet.entity';
import { S3Service } from '../s3/s3.service';
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
    private s3Service: S3Service,
    private dataSource: DataSource,
  ) {}

  async create(
    createPetDto: CreatePetDto,
    image: Express.Multer.File,
  ): Promise<Pet> {
    let imgUrl: string;
    if (image) {
      const { url } = await this.s3Service.uploadPublicFile(image);
      imgUrl = url;
    }

    const newPet: Pet = this.petRepository.create({
      ...createPetDto,
      avatarUrl: imgUrl,
      species: {
        id: createPetDto.speciesId,
      },
    });
    const petCreated = await this.petRepository.save(newPet);
    return await this.getById(petCreated.id);
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

  async addPhotos(petId: string, images: Express.Multer.File[]): Promise<void> {
    const isExist = await this.existsPet(petId);

    if (!isExist) {
      throw new HttpException('Pet is not found', HttpStatus.NOT_FOUND);
    }

    const imagesUpload = images.map(async (image) => {
      return await this.s3Service.uploadPublicFile(image);
    });

    const imgUrls = await Promise.all(imagesUpload);

    const photosCreate: PetPhoto[] = imgUrls.map(({ url }) => {
      return this.petPhotoRepository.create({
        imgUrl: url,
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
}
