import { Profile } from '@entity';
import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';
import { FollowsModule } from '../follows/follows.module';
import { PetModule } from '../pet/pet.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Profile]),
    PetModule,
    forwardRef(() => FollowsModule),
  ],
  controllers: [ProfileController],
  providers: [ProfileService],
  exports: [ProfileService],
})
export class ProfileModule {}
