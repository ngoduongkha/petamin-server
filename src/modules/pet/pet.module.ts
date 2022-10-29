import { Pet, PetPhoto } from '@entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { S3Module } from '../s3/s3.module';
import { SpeciesService } from '../species/species.service';
import { PetController } from './pet.controller';
import { PetService } from './pet.service';

@Module({
  imports: [TypeOrmModule.forFeature([Pet, PetPhoto]), S3Module],
  controllers: [PetController],
  providers: [PetService],
})
export class PetModule {}
