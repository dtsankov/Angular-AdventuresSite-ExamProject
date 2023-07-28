import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { environment } from '../environments/environment';
import { IUser } from '../interfaces/user';
import { getSession, logoutSession } from '../shared/session/session';

const apiUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private router: Router) {}

  user: IUser | null = null;

  isLogged: boolean = false;

  get isLoggedIn():boolean {
    console.log(this.user);
    return this.user !== null;
  }

  register(username:string, email: string, password: string, img: string) {
    return this.http
      .post<IUser>(`${apiUrl}/auth/register`, {username, email, password, img })
      .pipe(
        tap((user) => {
          this.user = user;
          localStorage.setItem('token', this.user.accessToken); // TODO
        })
      );
  }

  login(email: string, password: string) {
    return this.http
      .post<IUser>(`${apiUrl}/auth/login`, { email, password })
      .pipe(
        tap((user) => {
          this.user = user;
          localStorage.setItem('token', this.user.accessToken);
        })
      );
  }

  logout() {
    if (!getSession()) {
      return;
    }
    logoutSession();
    this.setLoginInfo(null, false);
    this.router.navigate(['/']);
  }

  setLoginInfo(user: IUser | null, status: boolean) {
    return (this.user = user), (this.isLogged = status);
  }
}