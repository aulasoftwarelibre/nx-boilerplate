import { IEvent } from '@nestjs/cqrs';

export abstract class Event implements IEvent {
  abstract id: string;
  eventName: string;

  constructor() {
    this.eventName = this.constructor.name;
  }
}
