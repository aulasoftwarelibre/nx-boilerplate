import { ICommand } from '@nestjs/cqrs';

export class UpdateUserCommand implements ICommand {
  constructor(
    public readonly userId: string,
    public readonly username: string,
    public readonly password: string | null,
    public readonly roles: string[]
  ) {}
}
