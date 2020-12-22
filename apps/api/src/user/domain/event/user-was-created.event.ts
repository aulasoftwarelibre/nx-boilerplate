import { StorableEvent } from 'event-sourcing-nestjs';

export class UserWasCreated extends StorableEvent {
  eventAggregate = 'user';
  eventVersion = 1;

  constructor(
    public readonly id: string,
    public readonly username: string,
    public readonly password: string
  ) {
    super();
  }
}
