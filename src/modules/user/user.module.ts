import { forwardRef, Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User, Profile } from '@entity';
import { ProfileModule } from '../profile/profile.module';
import { ProfileService } from '../profile/profile.service';
import { ConversationModule } from '../conversation/conversation.module';
import { ConversationService } from '../conversation/conversation.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    forwardRef(() => ProfileModule),
    forwardRef(() => ConversationModule),
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
