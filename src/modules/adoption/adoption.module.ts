import { Module } from '@nestjs/common';
import { AdoptionService } from './adoption.service';
import { AdoptionController } from './adoption.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Adoption } from '@entity';
import { PetModule } from '../pet/pet.module';

@Module({
  imports: [TypeOrmModule.forFeature([Adoption]), PetModule],
  controllers: [AdoptionController],
  providers: [AdoptionService],
  exports: [AdoptionService],
})
export class AdoptionModule {}
