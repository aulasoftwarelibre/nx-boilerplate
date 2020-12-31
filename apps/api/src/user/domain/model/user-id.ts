import { Id } from '@boilerplate/domain';
import * as uuid from 'uuid';

export class UserId extends Id {
  static generate(): UserId {
    return new UserId(uuid.v4());
  }

  public static fromString(id: string): UserId {
    return new UserId(id);
  }
}
