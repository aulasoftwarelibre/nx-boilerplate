import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';

import { USERS, Users } from '../../domain';
import { UserEntity } from '../entity/user.entity';

@Injectable()
export class UserService {
  constructor(
    @Inject(USERS) private users: Users,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>
  ) {}

  async validatePassword(username: string, password: string): Promise<boolean> {
    const user = await this.userRepository.findOne({ username });

    if (!user) {
      return false;
    }

    return bcrypt.compare(password, user.password);
  }
}
