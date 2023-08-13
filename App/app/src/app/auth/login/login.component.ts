import { Component } from '@angular/core';
import { NgForm} from '@angular/forms';
import {  Router } from '@angular/router';
import { setSession } from 'src/app/shared/session/session';
import { AuthService } from '../auth.services';
import { DEFAULT_EMAIL_DOMAINS } from 'src/app/shared/constants';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  appEmailDomains = DEFAULT_EMAIL_DOMAINS

  errorMessage: string | null = null;

 

  constructor(
    private router: Router,
    private authService: AuthService,
  ) {}


  loginHandler(form: NgForm): void {
    if (form.invalid) {
      return;
    }
    const { email, password } = form.value;

    this.authService.login(email!, password!).subscribe({
      next: (user) => {
        setSession(user);
        this.authService.setLoginInfo(user, true);
        this.router.navigate(['/adventures/catalog']);
      },
      error: (err) => {
        this.errorMessage = err.error.error
      },
    });
  }
}