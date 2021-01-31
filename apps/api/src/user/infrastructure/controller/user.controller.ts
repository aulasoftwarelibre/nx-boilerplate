import {
  CreateUserDTO,
  EditUserDTO,
  Role,
  UserDTO,
} from '@boilerplate/contracts';
import {
  BadRequestException,
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  Post,
  Put,
  Res,
  UseInterceptors,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Response } from 'express';

import { Roles } from '../../../auth/security/roles.decorator';
import { AuthService } from '../../../auth/services/auth.service';
import {
  CreateUserCommand,
  DeleteUserCommand,
  GetUserQuery,
  GetUsersQuery,
  UpdateUserCommand,
} from '../../application';
import { UserIdNotFoundError } from '../../domain';

@ApiBearerAuth()
@ApiTags('users')
@Controller('users')
@UseInterceptors(ClassSerializerInterceptor)
export class UserController {
  constructor(
    private authService: AuthService,
    private queryBus: QueryBus,
    private commandBus: CommandBus
  ) {}

  @Post()
  @Roles(Role.Admin)
  @ApiResponse({ status: 200, description: 'User created' })
  async create(@Body() createUserDto: CreateUserDTO): Promise<UserDTO> {
    try {
      const password = await this.authService.encodePassword(
        createUserDto.plainPassword
      );

      return await this.commandBus.execute(
        new CreateUserCommand(
          createUserDto.id,
          createUserDto.username,
          password,
          createUserDto.roles
        )
      );
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
  @ApiResponse({ status: 200, description: 'Users found' })
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
  @ApiResponse({ status: 200, description: 'User found' })
  @ApiResponse({ status: 404, description: 'Not found' })
  async findOne(@Param('id') id: string): Promise<UserDTO> {
    try {
      const user = await this.queryBus.execute<GetUserQuery, UserDTO>(
        new GetUserQuery(id)
      );

      if (!user) throw new NotFoundException();

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
  @ApiOperation({ summary: 'Updated user' })
  @ApiResponse({ status: 200, description: 'User updated' })
  @ApiResponse({ status: 404, description: 'Not found' })
  async update(
    @Param('id') id: string,
    @Body() editUserDTO: EditUserDTO
  ): Promise<UserDTO> {
    try {
      const user = await this.queryBus.execute<GetUserQuery, UserDTO>(
        new GetUserQuery(id)
      );

      if (!user) throw new NotFoundException();

      return this.commandBus.execute(
        new UpdateUserCommand(
          id,
          editUserDTO.username,
          editUserDTO.plainPassword,
          editUserDTO.roles
        )
      );
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
  async remove(@Param('id') id: string): Promise<UserDTO> {
    try {
      return this.commandBus.execute(new DeleteUserCommand(id));
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
}
