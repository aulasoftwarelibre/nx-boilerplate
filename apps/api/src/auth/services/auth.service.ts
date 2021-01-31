import {
  AccessTokenInterface,
  JwtPayloadInterface,
  UserDTO,
} from '@boilerplate/contracts';
import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { GetUserByUsernameQuery } from '../../user/application';

@Injectable()
export class AuthService {
  constructor(private queryBus: QueryBus, private jwtService: JwtService) {}

  async encodePassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt();

    return await bcrypt.hashSync(password, salt);
  }

  async validateUser(username: string, password: string): Promise<boolean> {
    const user = await this.queryBus.execute<GetUserByUsernameQuery, UserDTO>(
      new GetUserByUsernameQuery(username)
    );

    return user && (await bcrypt.compareSync(password, user.password));
  }

  async generateAccessToken(username: string): Promise<AccessTokenInterface> {
    const user = await this.queryBus.execute<GetUserByUsernameQuery, UserDTO>(
      new GetUserByUsernameQuery(username)
    );

    const payload: JwtPayloadInterface = {
      username: user.username,
      roles: user.roles,
    };

    return {
      access_token: this.jwtService.sign(payload, {
        algorithm: 'HS512',
      }),
    };
  }
}
