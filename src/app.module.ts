import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmAsyncConfig } from './config/typeorm.config';
import configurations from './config';
import { UserModule } from './modules/user/user.module';
import { ConversationModule } from './modules/conversation/conversation.module';
import { InformationModule } from './modules/information/information.module';
import { ProfileModule } from './modules/profile/profile.module';
import { PetModule } from './modules/pet/pet.module';
import { SpeciesModule } from './modules/species/species.module';
import { S3Module } from './modules/s3/s3.module';
import { MessagesModule } from './modules/messages/messages.module';

@Module({
  imports: [
    ConfigModule.forRoot({ load: configurations, isGlobal: true }),
    TypeOrmModule.forRootAsync(typeOrmAsyncConfig),
    UserModule,
    AuthModule,
    ConversationModule,
    InformationModule,
    ProfileModule,
    MessagesModule,
    PetModule,
    SpeciesModule,
    S3Module,
  ],
})
export class AppModule {}
