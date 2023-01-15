import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Adoption } from 'src/database/entities';
import { AdoptionService } from './adoption.service';
import { AdoptionController } from './adoption.controller';
import { PetModule } from '../pet/pet.module';

@Module({
  imports: [TypeOrmModule.forFeature([Adoption]), PetModule],
  controllers: [AdoptionController],
  providers: [AdoptionService],
  exports: [AdoptionService],
})
export class AdoptionModule {}
