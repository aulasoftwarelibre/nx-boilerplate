import { UserDTO } from '@boilerplate/contracts';
import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { USERS, Users } from '../../domain';
import { UserMapper } from '../../infrastructure/repository/user.mapper';
import { GetUsersQuery } from './get-users.query';

@QueryHandler(GetUsersQuery)
export class GetUsersHandler implements IQueryHandler<GetUsersQuery> {
  constructor(
    @Inject(USERS) private users: Users,
    private userMapper: UserMapper
  ) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async execute(query: GetUsersQuery): Promise<UserDTO[] | null> {
    const users = await this.users.findAll();

    return users.map(this.userMapper.aggregateToEntity);
  }
}
