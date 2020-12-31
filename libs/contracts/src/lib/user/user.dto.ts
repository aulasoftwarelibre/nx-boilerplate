import { Role } from '../auth';

export class UserDTO {
  id: string;
  username: string;
  roles: Role[];
}
