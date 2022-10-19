import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  TypeOrmModuleAsyncOptions,
  TypeOrmModuleOptions,
} from '@nestjs/typeorm';
import { resolve } from 'path';

export const typeOrmAsyncConfig: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: async (): Promise<TypeOrmModuleOptions> => {
    return {
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT, 10),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      logging: process.env.DB_LOGGING === 'true',
      entities: [resolve(__dirname, '../database/entities/*.entity.{js,ts}')],
      migrations: [resolve(__dirname, '../database/migrations/*.{js,ts}')],
      migrationsTableName: '__migrations',
      synchronize: process.env.DB_SYNCHRONIZE === 'true',
    };
  },
};
