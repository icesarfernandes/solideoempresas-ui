import {User} from './user';

export class Account {
  id: number;
  code: number;
  name: string;
  email: string;
  address: string;
  isActive: boolean;
  accountStatus: string;
  phoneNumber: string;
  uid: string;
  users: User[];
}
