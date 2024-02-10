import { RoleUser } from '../enums/roles.enum';

export interface UserRequestI {
  sub: string;
  email: string;
  role: RoleUser;
}
