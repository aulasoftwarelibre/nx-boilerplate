import { Role } from '../auth';

export class CreateUserDTO {
  id: string;
  username: string;
  plainPassword: string;
  roles: Role[];
}
