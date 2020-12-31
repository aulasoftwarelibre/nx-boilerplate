import { IQuery } from '@nestjs/cqrs';

export class GetUserByUsernameQuery implements IQuery {
  constructor(public readonly username: string) {}
}
