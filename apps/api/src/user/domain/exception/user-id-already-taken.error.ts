import { UserId } from '../model';

export class UserIdAlreadyTakenError extends Error {
  public static with(userId: UserId): UserIdAlreadyTakenError {
    return new UserIdAlreadyTakenError(`User id ${userId.value} already taken`);
  }
}
