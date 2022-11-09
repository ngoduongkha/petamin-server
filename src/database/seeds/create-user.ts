import { Connection } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';

export class CreateUserSeed implements Seeder {
  run(factory: Factory, connection: Connection): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
