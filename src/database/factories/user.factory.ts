import { setSeederFactory } from 'typeorm-extension';
import { Profile, User } from '../entities';
import { Gender } from '../enums';

export default setSeederFactory(User, (faker) => {
  const user = new User({
    email: faker.internet.email(),
    password: 'abcd1234',
    profile: new Profile({
      name: faker.name.fullName(),
      avatar: faker.image.avatar(),
      address: faker.address.streetAddress(),
      phone: faker.phone.number('0##########'),
      bio: faker.lorem.paragraph(),
      gender: Object.values(Gender)[Math.floor(Math.random() * Object.keys(Gender).length)],
      birthday: faker.date.past(),
      totalFollowers: parseInt(faker.random.numeric(3), 10),
      totalFollowings: parseInt(faker.random.numeric(3), 10),
    }),
  });

  return user;
});
