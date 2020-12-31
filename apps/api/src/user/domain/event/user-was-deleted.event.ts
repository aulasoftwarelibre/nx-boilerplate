import { StorableEvent } from 'event-sourcing-nestjs';

export class UserWasDeleted extends StorableEvent {
  eventAggregate = 'user';
  eventVersion = 1;
  public readonly createdOn = new Date();

  constructor(public readonly id: string) {
    super();
  }
}
