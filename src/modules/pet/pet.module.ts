import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pet, PetPhoto } from 'src/database/entities';
import { PetController } from './pet.controller';
import { PetService } from './pet.service';

@Module({
  imports: [TypeOrmModule.forFeature([Pet, PetPhoto])],
  controllers: [PetController],
  providers: [PetService],
  exports: [PetService],
})
export class PetModule {}
