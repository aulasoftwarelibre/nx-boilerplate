import { ValueObject } from '@boilerplate/domain';

interface Props {
  value: string;
}

export class Username extends ValueObject<Props> {
  public static fromString(name: string): Username {
    if (name.length === 0) {
      throw new Error('Username cannot be empty');
    }

    if (!/^[a-zA-Z0-9ñÑ]+$/.test(name)) {
      throw new Error('Invalid username characters');
    }

    return new Username({ value: name });
  }

  get value(): string {
    return this.props.value;
  }
}
