import { Role } from '../auth';

export class EditUserDTO {
  username: string;
  plainPassword: string;
  roles: Role[];
}
