import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../../auth/auth.module';
import { CreateUserHandler } from '../application/command/create-user.handler';
import { GetUserHandler } from '../application/query/get-user.handler';
import { UserController } from './controller/user.controller';
import { UserEntity } from './entity/user.entity';
import { UserMapper } from './repository/user.mapper';
import { userProviders } from './user.providers';

const CommandHandlers = [CreateUserHandler];
const QueryHandlers = [GetUserHandler];

@Module({
  controllers: [UserController],
  imports: [AuthModule, CqrsModule, TypeOrmModule.forFeature([UserEntity])],
  providers: [
    ...userProviders,
    ...CommandHandlers,
    ...QueryHandlers,
    UserMapper,
  ],
})
export class UserModule {}
