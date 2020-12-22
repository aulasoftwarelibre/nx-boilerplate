import * as bcrypt from 'bcrypt';
import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { USERS, Users } from '../../domain';
import { UserEntity } from '../entity/user.entity';
import { UserMapper } from '../repository/user.mapper';

@Injectable()
export class UserService {
  constructor(
    @Inject(USERS) private users: Users,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    private userMapper: UserMapper
  ) {}

  async validatePassword(username: string, password: string): Promise<boolean> {
    const user = await this.userRepository.findOne({ username });

    return user && (await bcrypt.compareSync(password, user.password));
  }
}
