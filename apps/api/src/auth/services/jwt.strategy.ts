import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import { ExtractJwt } from 'passport-jwt';
import { QueryBus } from '@nestjs/cqrs';
import { GetUserQuery, UserDTO } from '../../user/application';
import { JwtPayload } from '../dto/jwt-payload.dto';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private queryBus: QueryBus) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: JwtPayload): Promise<UserDTO> {
    const user = await this.queryBus.execute<GetUserQuery, UserDTO>(
      new GetUserQuery(payload.username)
    );

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
