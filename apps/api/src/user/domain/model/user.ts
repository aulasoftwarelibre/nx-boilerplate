import { AggregateRoot } from '@nestjs/cqrs';
import { UserRoleWasAdded, UserRoleWasRemoved, UserWasCreated } from '../event';
import { Password } from './password';
import { Role } from './role';
import { UserId } from './user-id';
import { Username } from './username';

export class User extends AggregateRoot {
  private _userId: UserId;
  private _username: Username;
  private _password: Password;
  private _roles: Role[];

  private constructor() {
    super();
  }

  public static add(
    userId: UserId,
    username: Username,
    password: Password
  ): User {
    const user = new User();

    user.apply(
      new UserWasCreated(userId.value, username.value, password.value)
    );

    return user;
  }

  get id(): UserId {
    return this._userId;
  }

  get username(): Username {
    return this._username;
  }

  get password(): Password {
    return this._password;
  }

  get roles(): Role[] {
    return Array.from(this._roles);
  }

  hasRole(role: Role): boolean {
    return this._roles.some((item: Role) => item.equals(role));
  }

  addRole(role: Role): void {
    if (this.hasRole(role)) {
      return;
    }

    this.apply(new UserRoleWasAdded(this.id.value, role.value));
  }

  removeRole(role: Role): void {
    if (!this.hasRole(role)) {
      return;
    }

    this.apply(new UserRoleWasRemoved(this.id.value, role.value));
  }

  private onUserWasCreated(event: UserWasCreated) {
    this._userId = UserId.fromString(event.id);
    this._username = Username.fromString(event.username);
    this._password = Password.fromString(event.password);
    this._roles = [];
  }

  private onUserRoleWasAdded(event: UserRoleWasAdded) {
    this._roles.push(Role.fromString(event.role));
  }

  private onUserRoleWasRemoved(event: UserRoleWasRemoved) {
    this._roles = this._roles.filter(
      (item: Role) => !item.equals(Role.fromString(event.role))
    );
  }
}
