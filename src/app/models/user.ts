import { Account } from './account';
import {UserRole} from './user-role';

export class User {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  role: UserRole;
  accountDto: Account;
  status: string;
  token?: string;
}
