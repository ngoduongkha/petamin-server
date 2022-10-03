import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User, Profile } from '@entity';
import { ProfileModule } from '../profile/profile.module';
import { ProfileService } from '../profile/profile.service';


@Module({
  imports: [
    ProfileModule, TypeOrmModule.forFeature([User]),
    TypeOrmModule.forFeature([Profile]),
  ],
  controllers: [UserController],
  providers: [UserService, ProfileService],
  exports: [UserService],
})
export class UserModule { }
