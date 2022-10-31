import { Follows } from '@entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfileModule } from '../profile/profile.module';
import { FollowsController } from './follows.controller';
import { FollowsService } from './follows.service';

@Module({
  imports: [TypeOrmModule.forFeature([Follows]), ProfileModule],
  controllers: [FollowsController],
  providers: [FollowsService],
})
export class FollowsModule {}
