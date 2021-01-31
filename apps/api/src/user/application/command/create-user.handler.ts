import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import {
  Password,
  Role,
  User,
  UserId,
  Username,
  USERS,
  Users,
} from '../../domain';
import {
  UserIdAlreadyTakenError,
  UsernameAlreadyTakenError,
} from '../../domain/exception/';
import { UserMapper } from '../../infrastructure/repository/user.mapper';
import { CreateUserCommand } from './create-user.command';

@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
  constructor(
    @Inject(USERS) private users: Users,
    private userMapper: UserMapper
  ) {}

  async execute(command: CreateUserCommand) {
    const userId = UserId.fromString(command.userId);
    const username = Username.fromString(command.username);
    const password = Password.fromString(command.password);

    if (await this.users.find(userId)) {
      throw UserIdAlreadyTakenError.with(userId);
    }

    if (await this.users.findOneByUsername(username)) {
      throw UsernameAlreadyTakenError.with(username);
    }

    const user = User.add(userId, username, password);
    command.roles.map((role: string) => user.addRole(Role.fromString(role)));

    this.users.save(user);

    return this.userMapper.aggregateToEntity(user);
  }
}
