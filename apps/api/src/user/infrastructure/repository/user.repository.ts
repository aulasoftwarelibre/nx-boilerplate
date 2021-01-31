import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User, UserId, Username, Users } from '../../domain';
import { UserEntity } from '../entity/user.entity';
import { UserMapper } from './user.mapper';

@Injectable()
export class UserRepository implements Users {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    private userMapper: UserMapper,
    private publisher: EventPublisher
  ) {}

  async find(userId: UserId): Promise<User|null> {
    const user = await this.userRepository.findOne(userId.value);

    if (!user) {
      return null;
    }

    return this.userMapper.entityToAggregate(user);
  }

  async findAll(): Promise<User[]> {
    const users = await this.userRepository.find();

    return users.map(this.userMapper.entityToAggregate);
  }

  async findOneByUsername(username: Username): Promise<User|null> {
    const user = await this.userRepository.findOne({
      username: username.value,
    });

    if (!user) {
      return null;
    }

    return this.userMapper.entityToAggregate(user);
  }

  save(user: User): void {
    this.userRepository.save(this.userMapper.aggregateToEntity(user));

    user = this.publisher.mergeObjectContext(user);
    user.commit();
  }
}
