import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';
import * as argon from 'argon2';
import { AdoptionStatus, Gender, Species } from '../enums';
import { Adoption, Pet, PetPhoto, Profile, User, UserConversation } from '../entities';

export default class PetSeeder implements Seeder {
  async run(dataSource: DataSource): Promise<void> {
    const petRepository = dataSource.getRepository(Pet);
    const userRepository = dataSource.getRepository(User);
    const profileRepository = dataSource.getRepository(Profile);
    const petPhotoRepository = dataSource.getRepository(PetPhoto);
    const adoptionRepository = dataSource.getRepository(Adoption);
    const userConversationRepository = dataSource.getRepository(UserConversation);

    await adoptionRepository.delete({});
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

    const user = await userRepository.findOneByOrFail({
      email: 'buiminhhuy@gmail.com',
    });

    const pets = petRepository.create([
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
        isAdopting: true,
        adoptions: [
          {
            userId: user.id,
            status: AdoptionStatus.SHOW,
            price: 10.0,
          },
        ],
        photos: [
          {
            title: 'Image #1',
            description: 'First image of Milo',
            imgUrl:
              'https://www.akc.org/wp-content/uploads/2017/11/Bulldog-standing-in-the-grass.jpg',
          },
          {
            title: 'Image #2',
            description: 'Second image of Milo',
            imgUrl:
              'https://images.unsplash.com/photo-1568315056770-f4a63027dcd3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8YnVsbGRvZ3xlbnwwfHwwfHw%3D&w=1000&q=80',
          },
          {
            title: 'Image #3',
            description: 'Third image of Milo',
            imgUrl:
              'https://cdn.pixabay.com/photo/2020/07/20/06/42/english-bulldog-5422018__340.jpg',
          },
          {
            title: 'Image #4',
            description: 'Fourth image of Milo',
            imgUrl:
              'https://media.istockphoto.com/id/855841098/photo/english-bulldog.jpg?s=612x612&w=0&k=20&c=MH8THQVlDgsnFVgmlAD2PtsYC08FSiKKmuSIa2UkmFs=',
          },
          {
            title: 'Image #5',
            description: 'Fifth image of Milo',
            imgUrl:
              'https://t4.ftcdn.net/jpg/00/86/67/45/360_F_86674540_3e6FWLLSXXKkjC5gwcAMy4JIPyfubCvU.jpg',
          },
          {
            title: 'Image #6',
            description: 'Sixth image of Milo',
            imgUrl:
              'https://media.istockphoto.com/id/585284336/photo/purebreed-englsh-bulldog-lying-on-grass.jpg?b=1&s=170667a&w=0&k=20&c=MfEQD4a5Kn2cWk_AgbL1PDfX9xvMxE02teXPgM7wuYw=',
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
        avatarUrl: 'https://upload.wikimedia.org/wikipedia/commons/b/b8/Degaen.jpg',
        weight: 5.5,
        description: 'Milk is a very cute dog',
        species: Species.DOG,
        isAdopting: true,
        adoptions: [
          {
            userId: user.id,
            status: AdoptionStatus.SHOW,
            price: 12.0,
          },
        ],
        photos: [
          {
            title: 'Image #1',
            description: 'First image of Milk',
            imgUrl:
              'https://media.istockphoto.com/id/889640780/photo/chihuahua-sitting-looking-at-the-camera-5-year-old-isolated-on-white.jpg?s=612x612&w=0&k=20&c=9CfHSY3cvKZ6QJpF0WUVAaZbzOBusNg6j7uwLD0BCJs=',
          },
          {
            title: 'Image #2',
            description: 'Second image of Milk',
            imgUrl:
              'https://images.unsplash.com/photo-1617218326259-2a338a730d1c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8Y2hpaHVhaHVhfGVufDB8fDB8fA%3D%3D&w=1000&q=80',
          },
          {
            title: 'Image #3',
            description: 'Third image of Milk',
            imgUrl:
              'https://images.unsplash.com/photo-1610041518868-f9284e7eecfe?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Y2hpaHVhaHVhfGVufDB8fDB8fA%3D%3D&w=1000&q=80',
          },
          {
            title: 'Image #4',
            description: 'Fourth image of Milk',
            imgUrl:
              'https://images.unsplash.com/photo-1607386176712-d8baeb6178a7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8Y2hpaHVhaHVhfGVufDB8fDB8fA%3D%3D&w=1000&q=80',
          },
          {
            title: 'Image #5',
            description: 'Fifth image of Milk',
            imgUrl:
              'https://www.shutterstock.com/image-photo/closeup-portrait-small-funny-beige-260nw-1914196390.jpg',
          },
          {
            title: 'Image #6',
            description: 'Sixth image of Milk',
            imgUrl: 'https://cdn.pixabay.com/photo/2014/09/19/21/47/chihuahua-453063__480.jpg',
          },
        ],
        userId: user.id,
      },
      {
        name: 'CHIMTHUNHAT',
        month: 2,
        year: 5,
        gender: Gender.OTHER,
        breed: 'Toucan',
        isNeuter: false,
        avatarUrl: 'https://cdn.britannica.com/58/154258-050-1D37F2E7/Toco-toucan.jpg',
        weight: 1.5,
        description: 'Chim is a very cute bird',
        species: Species.BIRD,
        userId: user.id,
        isAdopting: true,
        adoptions: [
          {
            userId: user.id,
            status: AdoptionStatus.SHOW,
            price: 12.0,
          },
        ],
        photos: [
          {
            title: 'Image #1',
            description: 'First image of CHIMTHUNHAT',
            imgUrl: 'https://cdn.britannica.com/58/154258-050-1D37F2E7/Toco-toucan.jpg',
          },
          {
            title: 'Image #2',
            description: 'Second image of CHIMTHUNHAT',
            imgUrl:
              'https://images.unsplash.com/photo-1550853024-fae8cd4be47f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dG91Y2FufGVufDB8fDB8fA%3D%3D&w=1000&q=80',
          },
          {
            title: 'Image #3',
            description: 'Third image of CHIMTHUNHAT',
            imgUrl:
              'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvTyAPKx7aSXnchECb7AsnNvXwEC78u0RoFQ-jTRGC&s',
          },
        ],
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
        isAdopting: true,
        adoptions: [
          {
            userId: user.id,
            status: AdoptionStatus.SHOW,
            price: 15.0,
          },
        ],
        photos: [
          {
            title: 'Image #1',
            description: 'First image of CHIMTHUHAI',
            imgUrl:
              'https://thumbs.dreamstime.com/b/parrot-portrait-blue-yellow-macaw-ara-ararauna-33594099.jpg',
          },
          {
            title: 'Image #2',
            description: 'Second image of CHIMTHUHAI',
            imgUrl:
              'https://static9.depositphotos.com/1011278/1124/i/600/depositphotos_11248981-stock-photo-macaw-parrots.jpg',
          },
        ],
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
        isAdopting: true,
        adoptions: [
          {
            userId: user.id,
            status: AdoptionStatus.SHOW,
            price: 15.0,
          },
        ],
        photos: [
          {
            title: 'Image #1',
            description: 'First image of LowMew',
            imgUrl:
              'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWMdPh3Vs8nrnaT4GqQJvL60Nrr9VCc55BfjkSPEFm&s',
          },
          {
            title: 'Image #2',
            description: 'Second image of LowMew',
            imgUrl:
              'https://media.gettyimages.com/id/164283130/photo/abyssinian-cat.jpg?s=612x612&w=gi&k=20&c=MUfw-CjqdhR6-6GiO_rNgw8sXDdMZWloOmYWEmwoIow=',
          },
          {
            title: 'Image #3',
            description: 'Third image of LowMew',
            imgUrl:
              'https://images.pexels.com/photos/13986951/pexels-photo-13986951.jpeg?cs=srgb&dl=pexels-lindsey-garrett-13986951.jpg&fm=jpg',
          },
          {
            title: 'Image #4',
            description: 'Fourth image of LowMew',
            imgUrl: 'https://thumbs.dreamstime.com/b/young-abyssinian-cat-10426115.jpg',
          },
        ],
      },
      {
        name: 'BinCatMeo',
        month: 2,
        year: 2,
        gender: Gender.OTHER,
        breed: 'American Bobtail',
        isNeuter: true,
        avatarUrl:
          'https://t3.ftcdn.net/jpg/01/62/81/32/360_F_162813298_NgcMwgxZUlR39VV9D0v5Gswfrm2QcN3q.jpg',
        weight: 1.5,
        description: 'BinCat is a very cute meow',
        species: Species.CAT,
        userId: user.id,
        isAdopting: true,
        adoptions: [
          {
            userId: user.id,
            status: AdoptionStatus.SHOW,
            price: 15.0,
          },
        ],
        photos: [
          {
            title: 'Image #1',
            description: 'First image of BinCatMeo',
            imgUrl:
              'https://media.istockphoto.com/id/1251230413/photo/american-bobtail-cat-on-grass.jpg?s=612x612&w=0&k=20&c=9xWO3dp8E4XpvnS3SPUmEa4cIJFhnSb7cz2XgAJBayQ=',
          },
          {
            title: 'Image #2',
            description: 'Second image of BinCatMeo',
            imgUrl:
              'https://media.gettyimages.com/id/1205941903/photo/white-american-bobtail-manx-cat-outdoors.jpg?s=612x612&w=gi&k=20&c=PdgniC0SD3X0W2WcdpOW0YSDHY4J_ZG11v8r-55D0a4=',
          },
          {
            title: 'Image #3',
            description: 'Third image of BinCatMeo',
            imgUrl:
              'https://media.istockphoto.com/id/808978160/photo/american-bobtail-cat.jpg?s=612x612&w=0&k=20&c=B9Qo0G0H1rmSdowYHJAILVpIsgRFPKa8gqMHsn3rBHg=',
          },
        ],
      },
    ]);

    await petRepository.save(pets);
  }
}
