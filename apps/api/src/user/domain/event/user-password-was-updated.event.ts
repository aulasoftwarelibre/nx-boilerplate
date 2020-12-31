import { StorableEvent } from 'event-sourcing-nestjs';

export class UserPasswordWasUpdated extends StorableEvent {
  eventAggregate = 'user';
  eventVersion = 1;

  constructor(public readonly id: string, public readonly password: string) {
    super();
  }
}
