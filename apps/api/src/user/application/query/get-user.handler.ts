import { UserDTO } from '@boilerplate/contracts';
import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { UserId } from '../../domain';
import { USERS, Users } from '../../domain/repository/users';
import { UserMapper } from '../../infrastructure/repository/user.mapper';
import { GetUserQuery } from './get-user.query';

@QueryHandler(GetUserQuery)
export class GetUserHandler implements IQueryHandler<GetUserQuery> {
  constructor(
    @Inject(USERS) private users: Users,
    private userMapper: UserMapper
  ) {}

  async execute(query: GetUserQuery): Promise<UserDTO | null> {
    const user = await this.users.find(UserId.fromString(query.id));

    if (!user) {
      return null;
    }

    return this.userMapper.aggregateToEntity(user);
  }
}
