import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Roles } from '../../../auth/security/roles.decorator';
import { AuthService } from '../../../auth/services/auth.service';
import { CreateUserCommand } from '../../application';
import { CreateUserDto } from '../dto';

@ApiBearerAuth()
@Controller('users')
export class UserController {
  constructor(
    private authService: AuthService,
    private queryBus: QueryBus,
    private commandBus: CommandBus
  ) {}

  @Post()
  @Roles('ROLE_ADMIN')
  async create(@Body() createUserDto: CreateUserDto) {
    try {
      const password = await this.authService.encodePassword(
        createUserDto.password
      );

      await this.commandBus.execute(
        new CreateUserCommand(
          createUserDto.id,
          createUserDto.username,
          password,
          createUserDto.roles
        )
      );

      return createUserDto;
    } catch (e) {
      if (e instanceof Error) {
        throw new BadRequestException(e.message);
      } else {
        throw new BadRequestException('Server error');
      }
    }
  }
}
