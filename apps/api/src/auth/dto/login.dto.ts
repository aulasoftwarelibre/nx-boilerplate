import { CredentialsInterface } from '@boilerplate/contracts';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDTO implements CredentialsInterface {
  @ApiProperty()
  username: string;
  @ApiProperty()
  password: string;
}
