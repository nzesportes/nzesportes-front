import {Gender} from '../enums/gender';
import {User} from './user.model';

export interface Customer {
  id: string;
  name: string;
  lastName: string;
  userId: string;
  instagram: string;
  phone: string;
  birthDate: Date;
  cpf: string;
  gender: Gender;
  user: User;
}
