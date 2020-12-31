import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { USERS, Users } from '../../domain';
import { UserView } from '../view';
import { GetUsersQuery } from './get-users.query';

@QueryHandler(GetUsersQuery)
export class GetUsersHandler implements IQueryHandler<GetUsersQuery> {
  constructor(@Inject(USERS) private users: Users) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async execute(query: GetUsersQuery): Promise<UserView[] | null> {
    const users = await this.users.findAll();

    return users.map<UserView>((user) => ({
      id: user.id.value,
      username: user.username.value,
      password: '',
      roles: user.roles.map((role) => role.value),
    }));
  }
}
