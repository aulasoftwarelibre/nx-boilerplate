import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { QueryBus } from '@nestjs/cqrs';
import { AccessToken } from '../dto/accesstoken.dto';
import { GetUserQuery, UserDTO } from '../../user/application';
import { JwtPayload } from '../dto/jwt-payload.dto';

@Injectable()
export class AuthService {
  constructor(private queryBus: QueryBus, private jwtService: JwtService) {}

  async encodePassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt();

    return await bcrypt.hashSync(password, salt);
  }

  async validateUser(username: string, password: string): Promise<boolean> {
    const user = await this.queryBus.execute<GetUserQuery, UserDTO>(
      new GetUserQuery(username)
    );

    return user && (await bcrypt.compareSync(password, user.password));
  }

  async generateAccessToken(username: string): Promise<AccessToken> {
    const user = await this.queryBus.execute<GetUserQuery, UserDTO>(
      new GetUserQuery(username)
    );

    const payload: JwtPayload = {
      username: user.username,
      roles: user.roles,
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
