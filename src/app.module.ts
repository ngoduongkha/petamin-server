import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmAsyncConfig } from './config/typeorm.config';
import configurations from './config';
import { UserModule } from './modules/users/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({ load: configurations, isGlobal: true }),
    TypeOrmModule.forRootAsync(typeOrmAsyncConfig),
    // TODO: refactor
    UserModule,
    AuthModule,
  ],
})
export class AppModule {}
