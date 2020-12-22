import { ValueObject } from '@boilerplate/domain';

interface Props {
  value: string;
}

export class Password extends ValueObject<Props> {
  public static fromString(name: string): Password {
    if (name.length < 8) {
      throw new Error('Password too short');
    }

    return new Password({ value: name });
  }

  get value(): string {
    return this.props.value;
  }
}
