import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configurations from './config';
import { UserModule } from './modules/user/user.module';
import { ConversationModule } from './modules/conversation/conversation.module';
import { ProfileModule } from './modules/profile/profile.module';
import { PetModule } from './modules/pet/pet.module';
import { S3Module } from './modules/s3/s3.module';
import { MessagesModule } from './modules/messages/messages.module';
import { AgoraModule } from './modules/agora/agora.module';
import { FileModule } from './modules/file/file.module';
import { FollowsModule } from './modules/follows/follows.module';
import { AdoptionModule } from './modules/adoption/adoption.module';
import { TransactionModule } from './modules/transaction/transaction.module';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({ load: configurations, isGlobal: true }),
    UserModule,
    AuthModule,
    ConversationModule,
    ProfileModule,
    MessagesModule,
    PetModule,
    S3Module,
    AgoraModule,
    FileModule,
    FollowsModule,
    AdoptionModule,
    TransactionModule,
    DatabaseModule,
  ],
})
export class AppModule {}
