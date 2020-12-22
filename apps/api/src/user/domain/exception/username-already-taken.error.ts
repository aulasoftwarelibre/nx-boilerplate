import { Username } from '../model';

export class UsernameAlreadyTakenError extends Error {
  public static with(username: Username): UsernameAlreadyTakenError {
    return new UsernameAlreadyTakenError(
      `Username ${username.value} already taken`
    );
  }
}
