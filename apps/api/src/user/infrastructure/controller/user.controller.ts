import { CreateUserDTO, EditUserDTO, Role } from '@boilerplate/contracts';
import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Response } from 'express';

import { Roles } from '../../../auth/security/roles.decorator';
import { AuthService } from '../../../auth/services/auth.service';
import {
  CreateUserCommand,
  DeleteUserCommand,
  GetUserQuery,
  GetUsersQuery,
  UpdateUserCommand,
  UserView,
} from '../../application';
import { UserIdNotFoundError } from '../../domain';
import { UserDTO } from '../dto';

@ApiBearerAuth()
@Controller('users')
export class UserController {
  constructor(
    private authService: AuthService,
    private queryBus: QueryBus,
    private commandBus: CommandBus
  ) {}

  @Post()
  @Roles(Role.Admin)
  async create(@Body() createUserDto: CreateUserDTO): Promise<UserDTO> {
    try {
      const password = await this.authService.encodePassword(
        createUserDto.plainPassword
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

  @Get()
  @Roles(Role.Admin)
  async findAll(@Res({ passthrough: true }) res: Response) {
    try {
      const users = await this.queryBus.execute<GetUsersQuery, UserDTO[]>(
        new GetUsersQuery()
      );

      res.setHeader('X-Total-Count', users.length);

      return users;
    } catch (e) {
      if (e instanceof Error) {
        throw new BadRequestException(e.message);
      } else {
        throw new BadRequestException('Server error');
      }
    }
  }

  @Get(':id')
  @Roles(Role.Admin)
  async findOne(@Param('id') id: string): Promise<UserDTO> {
    try {
      const user = await this.queryBus.execute<GetUserQuery, UserView>(
        new GetUserQuery(id)
      );

      if (!user) throw new NotFoundException();
      delete user.password;

      return user;
    } catch (e) {
      if (e instanceof UserIdNotFoundError) {
        throw new NotFoundException('User not found');
      } else if (e instanceof Error) {
        throw new BadRequestException(e.message);
      } else {
        throw new BadRequestException('Server error');
      }
    }
  }

  @Put(':id')
  @Roles(Role.Admin)
  async update(@Param('id') id: string, @Body() editUserDTO: EditUserDTO) {
    try {
      const user = await this.queryBus.execute<GetUserQuery, UserView>(
        new GetUserQuery(id)
      );

      if (!user) throw new NotFoundException();

      await this.commandBus.execute(
        new UpdateUserCommand(
          id,
          editUserDTO.username,
          editUserDTO.plainPassword,
          editUserDTO.roles
        )
      );

      return editUserDTO;
    } catch (e) {
      if (e instanceof UserIdNotFoundError) {
        throw new NotFoundException('User not found');
      } else if (e instanceof Error) {
        throw new BadRequestException(e.message);
      } else {
        throw new BadRequestException('Server error');
      }
    }
  }

  @ApiOperation({ summary: 'Delete user' })
  @ApiResponse({ status: 200, description: 'Delete user' })
  @ApiResponse({ status: 404, description: 'Not found' })
  @HttpCode(200)
  @Delete(':id')
  @Roles(Role.Admin)
  async remove(@Param('id') id: string) {
    try {
      await this.commandBus.execute(new DeleteUserCommand(id));
    } catch (e) {
      if (e instanceof UserIdNotFoundError) {
        throw new NotFoundException('User not found');
      } else if (e instanceof Error) {
        throw new BadRequestException(e.message);
      } else {
        throw new BadRequestException('Server error');
      }
    }

    return {
      id,
    };
  }
}
