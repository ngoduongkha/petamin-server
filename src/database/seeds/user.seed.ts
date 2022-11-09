import { User } from '@entity';
import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';

export default class UserSeeder implements Seeder {
  async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<void> {
    const userRepository = dataSource.getRepository(User);

    await userRepository.delete({});

    await userRepository.save({
      email: 'buiminhhuy@gmail.com',
      password: 'abcd1234',
    });

    const userFactory = factoryManager.get(User);
    await userFactory.saveMany(5);
  }
}
