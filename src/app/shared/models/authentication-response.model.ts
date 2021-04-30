import {Role} from '../enums/role.enum';

export interface AuthenticationResponse {
  token: string;
  id: string;
  username: string;
  roles: Role[];
}
