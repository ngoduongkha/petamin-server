import * as dotenv from 'dotenv';
import { resolve } from 'path';
import { DataSource, DataSourceOptions } from 'typeorm';
import { SeederOptions } from 'typeorm-extension';
import { NamingStrategy } from './database/utils';

dotenv.config();

const options: DataSourceOptions & SeederOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT!, 10),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [resolve(__dirname, '**/database/entities/*.entity.{js,ts}')],
  migrations: [resolve(__dirname, '**/database/migrations/*.{js,ts}')],
  migrationsTableName: '__migrations',
  seeds: [resolve(__dirname, '**/database/seeds/**/*{.ts,.js}')],
  factories: [resolve(__dirname, '**/database/factories/**/*{.ts,.js}')],
  namingStrategy: new NamingStrategy(),
};

export default new DataSource(options);
