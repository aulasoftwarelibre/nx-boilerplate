import { UserId } from '../model';

export class UserIdNotFoundError extends Error {
  public static with(userId: UserId): UserIdNotFoundError {
    return new UserIdNotFoundError(`User id ${userId.value} not found`);
  }
}
