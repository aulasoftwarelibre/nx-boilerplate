import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Username } from '../../domain/model/username';
import { Users, USERS } from '../../domain/repository/users';
import { UserMapper } from '../../infrastructure/repository/user.mapper';
import { UserDTO } from '../dto';
import { GetUserQuery } from './get-user.query';

@QueryHandler(GetUserQuery)
export class GetUserHandler implements IQueryHandler<GetUserQuery> {
  constructor(
    @Inject(USERS) private users: Users,
    private userMapper: UserMapper
  ) {}

  async execute(query: GetUserQuery): Promise<UserDTO | null> {
    const user = await this.users.findOneByUsername(
      Username.fromString(query.username)
    );

    if (!user) {
      return null;
    }

    return this.userMapper.aggregateToEntity(user);
  }
}
