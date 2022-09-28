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
import { UserConversationModule } from './modules/user-conversation/user-conversation.module';

@Module({
  imports: [
    ConfigModule.forRoot({ load: configurations, isGlobal: true }),
    TypeOrmModule.forRootAsync(typeOrmAsyncConfig),
    // TODO: refactor
    UserModule,
    AuthModule,
    ConversationModule,
    InformationModule,
    ProfileModule,
    UserConversationModule,
  ],
  providers: [],
})
export class AppModule {}