import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuarations from './config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: configuarations,
      isGlobal: true,
      validationOptions: {
        abortEarly: true,
      },
    }),
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => {
        // TODO: Constant
        const config = configService.get<TypeOrmModuleOptions>('database');
        if (!config) {
          throw new Error('Cannot start app without ORM config');
        }
        return config;
      },
      inject: [ConfigService],
    }),
    // TODO: refactor
    UsersModule,
    AuthModule,
  ],
})
export class AppModule {}
