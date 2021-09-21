import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';
import {Account} from '../models/account';
import {User} from '../models/user';

@Injectable({ providedIn: 'root' })
export class AccountService {
  constructor(private http: HttpClient) { }

  getLoggerUserAccount(loggerUser: User) {
     return this.http.get<Account>(`${environment.apiUrl}/account?accountId=` + loggerUser.accountDto.id);
  }
}
