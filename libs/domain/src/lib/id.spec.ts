import { Id } from './id';
import * as uuid from 'uuid';

describe('Id', () => {
  it('creates a id value object', () => {
    const id = uuid.v4();
    const myId = MyId.fromString(id);

    expect(myId.value).toBe(id);
  });
});

class MyId extends Id {
  private constructor(id: string) {
    super(id);
  }

  static fromString(id: string): MyId {
    return new this(id);
  }
}
