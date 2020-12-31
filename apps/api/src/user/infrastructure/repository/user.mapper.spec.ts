import { Test } from '@nestjs/testing';
import * as uuid from 'uuid';

import { Password, Role, User, UserId, Username } from '../../domain';
import { UserEntity } from '../entity/user.entity';
import { UserMapper } from './user.mapper';

describe('User mapper', () => {
  let userMapper: UserMapper;
  const userId = UserId.fromString(uuid.v4());
  const username = Username.fromString('username');
  const password = Password.fromString('password');
  const roleUser = Role.fromString('ROLE_USER');
  const roleAdmin = Role.fromString('ROLE_ADMIN');
  const roleAnonymous = Role.fromString('ROLE_ANONYMOUS');

  beforeAll(async () => {
    const app = await Test.createTestingModule({
      providers: [UserMapper],
    }).compile();

    userMapper = app.get<UserMapper>(UserMapper);
  });

  it('converts from entity to aggregate', () => {
    const aggregate = userMapper.entityToAggregate(
      new UserEntity(userId.value, username.value, password.value, [
        roleUser.value,
        roleAdmin.value,
      ])
    );

    expect(aggregate.id.equals(userId)).toBeTruthy();
    expect(aggregate.username.equals(username)).toBeTruthy();
    expect(aggregate.password.equals(password)).toBeTruthy();
    expect(aggregate.hasRole(roleUser)).toBeTruthy();
    expect(aggregate.hasRole(roleAdmin)).toBeTruthy();
    expect(aggregate.hasRole(roleAnonymous)).toBeFalsy();
  });

  it('converts from aggregate to entity', () => {
    const user = User.add(userId, username, password);
    user.addRole(roleUser);
    user.addRole(roleAdmin);

    const entity = userMapper.aggregateToEntity(user);

    expect(entity.id).toEqual(userId.value);
    expect(entity.username).toEqual(username.value);
    expect(entity.password).toEqual(password.value);
    expect(entity.roles).toEqual(
      expect.arrayContaining([roleUser.value, roleAdmin.value])
    );
    expect(entity.roles).not.toEqual(
      expect.arrayContaining([roleAnonymous.value])
    );
  });
});
