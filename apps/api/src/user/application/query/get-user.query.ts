import { IQuery } from '@nestjs/cqrs';

export class GetUserQuery implements IQuery {
  constructor(public readonly id: string) {}
}
