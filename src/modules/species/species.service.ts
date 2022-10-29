import { Species } from '@entity';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSpeciesDto } from './dto/create-species.dto';
import { UpdateSpeciesDto } from './dto/update-species.dto';
import { S3Service } from '../s3/s3.service';

@Injectable()
export class SpeciesService {
  constructor(
    @InjectRepository(Species)
    private speciesRepository: Repository<Species>,
    private s3Service: S3Service,
  ) {}

  async create(
    createSpeciesDto: CreateSpeciesDto,
    image?: Express.Multer.File,
  ): Promise<Species> {
    let imgUrl: string;
    if (image) {
      const { url } = await this.s3Service.uploadPublicFile(image);
      imgUrl = url;
    }

    return await this.speciesRepository.save({ ...createSpeciesDto, imgUrl });
  }

  async findAll(): Promise<Species[]> {
    return await this.speciesRepository.find({
      where: {
        isDeleted: false,
      },
    });
  }

  async getById(id: string): Promise<Species> {
    const species = await this.speciesRepository.findOneBy({
      id: id,
    });

    if (species.isDeleted)
      throw new HttpException(
        'This species has been deleted',
        HttpStatus.NOT_FOUND,
      );

    return species;
  }

  async update(
    id: string,
    updateSpeciesDto: UpdateSpeciesDto,
    image?: Express.Multer.File,
  ): Promise<Species> {
    if (!this.existSpecies(id))
      throw new HttpException('This species not found', HttpStatus.NOT_FOUND);

    let imgUrl: string;
    if (image) {
      const { url } = await this.s3Service.uploadPublicFile(image);
      imgUrl = url;
    }
    await this.speciesRepository.update(
      {
        id: id,
      },
      { ...updateSpeciesDto, imgUrl },
    );

    return await this.getById(id);
  }

  async remove(id: string): Promise<void> {
    const isExist = await this.existSpecies(id);
    if (!isExist)
      throw new HttpException('This species not found', HttpStatus.NOT_FOUND);

    await this.speciesRepository.update(
      {
        id: id,
      },
      {
        isDeleted: true,
      },
    );
  }

  async existSpecies(speciesId: string): Promise<boolean> {
    const species = await this.speciesRepository.findOne({
      where: {
        id: speciesId,
        isDeleted: false,
      },
    });

    if (species) return true;

    return false;
  }
}
