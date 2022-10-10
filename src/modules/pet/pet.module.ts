import { Pet, PetPhoto } from '@entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SpeciesService } from '../species/species.service';
import { PetController } from './pet.controller';
import { PetService } from './pet.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Pet]),
    TypeOrmModule.forFeature([PetPhoto]),
  ],
  controllers: [PetController],
  providers: [PetService],
})
export class PetModule {}
