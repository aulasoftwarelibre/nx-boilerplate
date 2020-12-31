import { Username } from '../../domain';
import { UserView } from './user.view';

export interface UserProjections {
  getAll(): Promise<UserView[]>;
  OneByUsername(username: Username): Promise<UserView | null>;
}

export const USER_PROJECTIONS = 'USER_PROJECTIONS';
