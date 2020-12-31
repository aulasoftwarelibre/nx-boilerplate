import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UserWasDeleted } from '../../domain/event/user-was-deleted.event';
import { UserEntity } from '../entity/user.entity';

@EventsHandler(UserWasDeleted)
export class UserWasDeletedSaga implements IEventHandler<UserWasDeleted> {
  constructor(
    @InjectRepository(UserEntity) private userRepository: Repository<UserEntity>
  ) {}

  async handle(event: UserWasDeleted) {
    const user = await this.userRepository.findOne(event.id);

    if (!user) {
      return;
    }

    this.userRepository.remove(user);
  }
}
