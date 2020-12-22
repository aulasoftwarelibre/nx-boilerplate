import { Username } from '../model';

export class UsernameNotFoundError extends Error {
  public static with(username: Username): UsernameNotFoundError {
    return new UsernameNotFoundError(`Username ${username.value} not found`);
  }
}
