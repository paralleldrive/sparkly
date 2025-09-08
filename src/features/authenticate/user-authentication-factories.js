import { faker } from '@faker-js/faker';
import { createId } from '@paralleldrive/cuid2';

export const createUser = ({
  id = createId(),
  email = '',
  name = '',
} = {}) => ({ id, email, name });

export const createPopulatedUser = ({
  id = createId(),
  email = faker.internet.email(),
  name = faker.person.fullName(),
} = {}) => createUser({ id, email, name });
