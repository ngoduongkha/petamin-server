import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Profile } from 'src/database/entities';
import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';
import { FollowsModule } from '../follows/follows.module';
import { PetModule } from '../pet/pet.module';
import { AdoptionModule } from '../adoption/adoption.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Profile]),
    PetModule,
    AdoptionModule,
    forwardRef(() => FollowsModule),
  ],
  controllers: [ProfileController],
  providers: [ProfileService],
  exports: [ProfileService],
})
export class ProfileModule {}
