import {Role} from '../enums/role.enum';

export interface AdminSaveTO {
  id: string;
  username: string;
  role: Role;
}
