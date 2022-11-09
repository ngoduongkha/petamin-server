import { Pet, PetPhoto, Profile, User, UserConversation } from '@entity';
import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { Gender, Species } from '../enums';
import * as argon from 'argon2';

export default class PetSeeder implements Seeder {
  async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<void> {
    const petRepository = dataSource.getRepository(Pet);
    const userRepository = dataSource.getRepository(User);
    const profileRepository = dataSource.getRepository(Profile);
    const petPhotoRepository = dataSource.getRepository(PetPhoto);
    const userConversationRepository =
      dataSource.getRepository(UserConversation);

    await userConversationRepository.delete({});
    await petPhotoRepository.delete({});
    await petRepository.delete({});
    await profileRepository.delete({});
    await userRepository.delete({});

    await userRepository.save({
      email: 'buiminhhuy@gmail.com',
      password: await argon.hash('abcd1234'),
      profile: {
        name: 'Huy',
      },
    });

    const user = await userRepository.findOneBy({
      email: 'buiminhhuy@gmail.com',
    });

    await petRepository.save([
      {
        name: 'Milo',
        month: 1,
        year: 2,
        gender: Gender.FEMALE,
        breed: 'Bulldog',
        isNeuter: true,
        avatarUrl:
          'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/Buldog_angielski_000pl.jpg/300px-Buldog_angielski_000pl.jpg',
        weight: 10.5,
        description: 'Milo is a very cute dog',
        species: Species.DOG,
        photos: [
          {
            title: '',
            description: '',
            imgUrl:
              'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/Buldog_angielski_000pl.jpg/300px-Buldog_angielski_000pl.jpg',
          },
          {
            title: '',
            description: '',
            imgUrl:
              'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/Buldog_angielski_000pl.jpg/300px-Buldog_angielski_000pl.jpg',
          },
          {
            title: '',
            description: '',
            imgUrl:
              'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/Buldog_angielski_000pl.jpg/300px-Buldog_angielski_000pl.jpg',
          },
          {
            title: '',
            description: '',
            imgUrl:
              'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/Buldog_angielski_000pl.jpg/300px-Buldog_angielski_000pl.jpg',
          },
          {
            title: '',
            description: '',
            imgUrl:
              'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/Buldog_angielski_000pl.jpg/300px-Buldog_angielski_000pl.jpg',
          },
          {
            title: '',
            description: '',
            imgUrl:
              'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/Buldog_angielski_000pl.jpg/300px-Buldog_angielski_000pl.jpg',
          },
          {
            title: '',
            description: '',
            imgUrl:
              'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/Buldog_angielski_000pl.jpg/300px-Buldog_angielski_000pl.jpg',
          },
          {
            title: '',
            description: '',
            imgUrl:
              'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/Buldog_angielski_000pl.jpg/300px-Buldog_angielski_000pl.jpg',
          },
          {
            title: '',
            description: '',
            imgUrl:
              'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/Buldog_angielski_000pl.jpg/300px-Buldog_angielski_000pl.jpg',
          },
          {
            title: '',
            description: '',
            imgUrl:
              'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/Buldog_angielski_000pl.jpg/300px-Buldog_angielski_000pl.jpg',
          },
          {
            title: '',
            description: '',
            imgUrl:
              'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/Buldog_angielski_000pl.jpg/300px-Buldog_angielski_000pl.jpg',
          },
          {
            title: '',
            description: '',
            imgUrl:
              'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/Buldog_angielski_000pl.jpg/300px-Buldog_angielski_000pl.jpg',
          },
          {
            title: '',
            description: '',
            imgUrl:
              'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/Buldog_angielski_000pl.jpg/300px-Buldog_angielski_000pl.jpg',
          },
        ],
        userId: user.id,
      },
      {
        name: 'Milk',
        month: 2,
        year: 3,
        gender: Gender.MALE,
        breed: 'Chihuahua',
        isNeuter: false,
        avatarUrl:
          'https://upload.wikimedia.org/wikipedia/commons/b/b8/Degaen.jpg',
        weight: 5.5,
        description: 'Milk is a very cute dog',
        species: Species.DOG,
        photos: [
          {
            title: '',
            description: '',
            imgUrl:
              'https://upload.wikimedia.org/wikipedia/commons/b/b8/Degaen.jpg',
          },
          {
            title: '',
            description: '',
            imgUrl:
              'https://upload.wikimedia.org/wikipedia/commons/b/b8/Degaen.jpg',
          },
          {
            title: '',
            description: '',
            imgUrl:
              'https://upload.wikimedia.org/wikipedia/commons/b/b8/Degaen.jpg',
          },
          {
            title: '',
            description: '',
            imgUrl:
              'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/Buldog_angielski_000pl.jpg/300px-Buldog_angielski_000pl.jpg',
          },
        ],
        userId: user.id,
      },
      {
        name: 'Chim',
        month: 2,
        year: 5,
        gender: Gender.OTHER,
        breed: 'Toucan',
        isNeuter: false,
        avatarUrl:
          'https://cdn.britannica.com/58/154258-050-1D37F2E7/Toco-toucan.jpg',
        weight: 1.5,
        description: 'Chim is a very cute bird',
        species: Species.BIRD,
        userId: user.id,
      },
      {
        name: 'CHIMTHUHAI',
        month: 2,
        year: 1,
        gender: Gender.OTHER,
        breed: 'Parrots',
        isNeuter: true,
        avatarUrl:
          'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Blue-and-Yellow-Macaw.jpg/800px-Blue-and-Yellow-Macaw.jpg',
        weight: 1.5,
        description: 'CHIMTHUHAI is a very cute bird',
        species: Species.BIRD,
        userId: user.id,
      },
      {
        name: 'LowMew',
        month: 9,
        year: 10,
        gender: Gender.OTHER,
        breed: 'Abyssinian',
        isNeuter: true,
        avatarUrl:
          'https://www.purina.com/sites/g/files/auxxlc196/files/styles/kraken_generic_max_width_240/public/Abyssinian_body_7.jpg?itok=E0O3mW9s',
        weight: 1.5,
        description: 'LowMew is a very cute meow',
        species: Species.CAT,
        userId: user.id,
      },
      {
        name: 'BinCat',
        month: 2,
        year: 2,
        gender: Gender.OTHER,
        breed: 'American Bobtail',
        isNeuter: true,
        avatarUrl:
          'https://www.purina.com/sites/g/files/auxxlc196/files/styles/kraken_generic_max_width_240/public/AmericanBobtail_body_6.jpg?itok=JYmdZhAt',
        weight: 1.5,
        description: 'BinCat is a very cute meow',
        species: Species.CAT,
        userId: user.id,
      },
    ]);
  }
}
