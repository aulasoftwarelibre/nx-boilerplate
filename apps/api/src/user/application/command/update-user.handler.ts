import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import {
  Password,
  Role,
  User,
  UserId,
  UserIdNotFoundError,
  USERS,
  Users,
} from '../../domain';
import { UserMapper } from '../../infrastructure/repository/user.mapper';
import { UpdateUserCommand } from './update-user.command';

@CommandHandler(UpdateUserCommand)
export class UpdateUserHandler implements ICommandHandler<UpdateUserCommand> {
  constructor(
    @Inject(USERS) private users: Users,
    private userMapper: UserMapper
  ) {}

  async execute(command: UpdateUserCommand) {
    const userId = UserId.fromString(command.userId);

    const user = await this.users.find(userId);
    if (!user) {
      throw UserIdNotFoundError.with(userId);
    }

    // TODO: this.updateUsername(user, command);
    this.updatePassword(user, command);
    this.updateRoles(user, command);

    this.users.save(user);

    return this.userMapper.aggregateToEntity(user);
  }

  private updatePassword(user: User, command: UpdateUserCommand) {
    command.password &&
      user.updatePassword(Password.fromString(command.password));
  }

  private updateRoles(user: User, command: UpdateUserCommand) {
    user.roles.map(
      (role) => !command.roles.includes(role.value) && user.removeRole(role)
    );
    command.roles.map((role) => user.addRole(Role.fromString(role)));
  }
}
