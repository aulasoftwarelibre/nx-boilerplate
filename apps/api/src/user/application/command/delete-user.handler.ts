import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { UserId, UserIdNotFoundError, USERS, Users } from '../../domain';
import { UserMapper } from '../../infrastructure/repository/user.mapper';
import { DeleteUserCommand } from './delete-user.command';

@CommandHandler(DeleteUserCommand)
export class DeleteUserHandler implements ICommandHandler<DeleteUserCommand> {
  constructor(
    @Inject(USERS) private users: Users,
    private userMapper: UserMapper
  ) {}

  async execute(command: DeleteUserCommand) {
    const userId = UserId.fromString(command.userId);

    const user = await this.users.find(userId);
    if (!user) {
      throw UserIdNotFoundError.with(userId);
    }

    user.delete();

    this.users.save(user);

    return this.userMapper.aggregateToEntity(user);
  }
}
