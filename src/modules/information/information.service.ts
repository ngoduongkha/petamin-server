import { Information, User } from '@entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
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

  async findSocketId(userIds: string[]): Promise<Information[]> {
    const socketIds = await this.informationRepository
      .createQueryBuilder('i')
      .innerJoinAndSelect(User, 'u', 'u.id = i.userId')
      .where('u.id IN (:...userIds)', { userIds })
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
