import { ICommand } from '@nestjs/cqrs';

export class DeleteUserCommand implements ICommand {
  constructor(public readonly userId: string) {}
}
