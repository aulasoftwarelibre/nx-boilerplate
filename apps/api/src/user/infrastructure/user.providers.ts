import { Provider } from '@nestjs/common';

import { USERS } from '../domain/repository/users';
import { UserRepository } from './repository/user.repository';

export const userProviders: Provider[] = [
  {
    provide: USERS,
    useClass: UserRepository,
  },
];
