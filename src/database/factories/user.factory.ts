import { User } from '@entity';
import { setSeederFactory } from 'typeorm-extension';

export default setSeederFactory(User, (faker) => {
  const user = new User();

  user.email = faker.internet.email();
  user.password = 'abcd1234';

  return user;
});
