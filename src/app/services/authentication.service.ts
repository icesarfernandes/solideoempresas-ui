import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { BehaviorSubject, Observable, from } from 'rxjs';

import { environment } from '../../environments/environment';
import { User } from '../models/user';
import {Router} from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  public authenticated = false;
  public loading = false;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': `application/json`
    })
  };

  constructor(private http: HttpClient, private router: Router) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  authenticate(credentials: any) {

    const headers = new HttpHeaders(
      credentials ? { authorization: 'Basic ' + btoa(credentials.username + ':' + credentials.password)} : {},
    );

    return this.http.get<User>(`${environment.apiUrl}/auth`, { headers: headers }).subscribe(response => {
      console.log(response);
      localStorage.setItem('currentUserToken', JSON.stringify(response.token));
      localStorage.setItem('currentUser', JSON.stringify(response));

      this.currentUserSubject.next(response);

      this.router.navigate(['/dashboard']);
      this.loading = true;
    });
  }

  logout() {
      localStorage.removeItem('currentUser');
      localStorage.removeItem('currentUserToken');
      this.currentUserSubject.next(null);
      this.router.navigate(['/login']);
  }
}
