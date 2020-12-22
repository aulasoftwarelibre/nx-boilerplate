import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { UserDTO } from '../../user/application';

@Injectable()
export class RolesGuard extends AuthGuard('jwt') {
  private readonly logger = new Logger(RolesGuard.name);

  constructor(private reflector: Reflector) {
    super();
  }

  handleRequest(err, user, info, context) {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());

    if (!roles) {
      return user;
    }

    this.logger.debug('roles: ' + JSON.stringify(roles));

    if (err || !user || !this.userHasRequiredRoles(user, roles)) {
      throw new UnauthorizedException();
    }

    return user;
  }

  private userHasRequiredRoles(user: UserDTO, roles: string[]) {
    return user.roles.some((role) => roles.includes(role));
  }
}
