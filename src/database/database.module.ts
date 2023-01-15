import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NamingStrategy } from './utils';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.getOrThrow('DB_HOST'),
        port: configService.getOrThrow('DB_PORT'),
        username: configService.getOrThrow('DB_USERNAME'),
        password: configService.getOrThrow('DB_PASSWORD'),
        database: configService.getOrThrow('DB_NAME'),
        entities: [`${__dirname}/entities/**/*.entity{.ts,.js}`],
        namingStrategy: new NamingStrategy(),
        synchronize: configService.getOrThrow('DB_SYNCHRONIZE') === 'true',
        logging: configService.getOrThrow('DB_LOGGING') === 'true',
      }),
    }),
  ],
})
export class DatabaseModule {}
