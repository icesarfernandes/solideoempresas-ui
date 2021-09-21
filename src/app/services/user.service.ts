import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { User } from '../models/user';
import {UserRole} from '../models/user-role';

@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(private http: HttpClient) { }

  getAllUsersByAccount(accountId: number) {
    return this.http.get<User[]>(`${environment.apiUrl}/users/usersByAccountId?accountId=` + accountId);
  }

  getUserById(userId: number) {
    return this.http.get<User>(`${environment.apiUrl}/users/userById?userId=` + userId);
  }

  getAllUsersRoles() {
    return this.http.get<UserRole[]>(`${environment.apiUrl}/users/roles`);
  }
}
