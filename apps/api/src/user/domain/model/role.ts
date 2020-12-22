import { ValueObject } from '@boilerplate/domain';

interface Props {
  value: string;
}

export class Role extends ValueObject<Props> {
  public static fromString(name: string): Role {
    if (name.length === 0) {
      throw new Error('Role cannot be empty');
    }

    name = name.toUpperCase();

    if (!/^[A-Z_]+$/.test(name)) {
      throw new Error('Invalid role characters');
    }

    return new Role({ value: name });
  }

  get value(): string {
    return this.props.value;
  }
}
