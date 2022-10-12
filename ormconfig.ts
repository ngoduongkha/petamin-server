import * as dotenv from 'dotenv';
import { join } from 'path';
import { DataSource } from 'typeorm';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

dotenv.config({
  path: `.env`,
});

const postgresConnectionOptions: PostgresConnectionOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  logging: process.env.DB_LOGGING === 'true',
  entities: [join(__dirname, '**/*.entity{.ts,.js}')],
  migrations: [join(__dirname, '**/database/migrations/*{.ts,.js}')],
  migrationsTableName: '__migrations',
  synchronize: false,
};

export default new DataSource(postgresConnectionOptions);
