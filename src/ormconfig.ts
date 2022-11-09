import * as dotenv from 'dotenv';
import { resolve } from 'path';
import { DataSource } from 'typeorm';
import { SeederOptions } from 'typeorm-extension';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

dotenv.config({
  path: `.env`,
});

const options: PostgresConnectionOptions & SeederOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  logging: process.env.DB_LOGGING === 'true',
  entities: [resolve(__dirname, '**/database/entities/*.entity.{js,ts}')],
  migrations: [resolve(__dirname, '**/database/migrations/*.{js,ts}')],
  migrationsTableName: '__migrations',
  synchronize: process.env.DATABASE_SYNCHRONIZE === 'true',
  seeds: [resolve(__dirname, '**/database/seeds/**/*{.ts,.js}')],
  factories: [resolve(__dirname, '**/database/factories/**/*{.ts,.js}')],
};

export default new DataSource(options);
