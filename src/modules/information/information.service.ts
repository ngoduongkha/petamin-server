import { Information, User } from '@entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ETypeInformation } from 'src/database/enums';
import { Repository } from 'typeorm';
import { SaveInformationDto } from './dto/save-infomation.dto';

@Injectable()
export class InformationService {
  constructor(
    @InjectRepository(Information)
    private informationRepository: Repository<Information>,
  ) {}

  // async findAll(
  //   relations: string[] = [],
  //   throwsException = false,
  // ): Promise<InformationEntity[]> {
  //   return await this.informationRepository.getAllEntity(
  //     relations,
  //     throwsException,
  //   );
  //   //sXTCnXu69-IQxbAuAAAB
  //   //3rZeXzcRkHAfAnO-AAAB
  // }

  async create(inputs: SaveInformationDto): Promise<Information> {
    console.log('inputs :>> ', inputs);
    return await this.informationRepository.save(inputs);
  }

  // async findById(
  //   id: number,
  //   relations: string[] = [],
  //   throwsException = false,
  // ): Promise<InformationEntity> {
  //   return await this.informationRepository.getEntityById(
  //     id,
  //     relations,
  //     throwsException,
  //   );
  // }

  async findSocketId(userId: string[]): Promise<Information[]> {
    const socketIds = await this.informationRepository
      .createQueryBuilder('i')
      .innerJoin(() => User, 'u')
      .where('u.id IN (:...userId)', { userId })
      .andWhere('i.type = :type', { type: ETypeInformation.socketId })
      .getMany();

    return socketIds;
  }

  // async update(
  //   Information: InformationEntity,
  //   inputs: SaveInformationDto,
  // ): Promise<InformationEntity> {
  //   return await this.informationRepository.updateEntity(Information, inputs);
  // }

  // async deleteById(id: number): Promise<boolean> {
  //   return await this.informationRepository.deleteEntityById(id);
  // }

  async deleteByValue(userId: string, value: string): Promise<boolean> {
    const deleteResult = await this.informationRepository.delete({
      userId,
      value,
    });

    if (deleteResult.affected) {
      return true;
    }

    return false;
  }
}
