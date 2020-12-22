import { StorableEvent } from 'event-sourcing-nestjs';
import { Role } from '../model/role';

export class UserRoleWasAdded extends StorableEvent {
  eventAggregate = 'user';
  eventVersion = 1;

  constructor(public readonly id: string, public readonly role: string) {
    super();
  }
}
