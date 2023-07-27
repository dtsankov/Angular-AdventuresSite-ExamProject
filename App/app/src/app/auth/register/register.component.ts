import { Component } from '@angular/core';
import { AuthService } from '../auth.services';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { appEmailValidator } from 'src/app/shared/validators/app-email-validator';
import { DEFAULT_EMAIL_DOMAINS } from 'src/app/shared/constants';
import { matchPasswordsValidator } from 'src/app/shared/validators/app-password-validator';
import { setSession } from 'src/app/shared/session/session';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  errorMessage: string | null = null;

  form = this.fb.group({
    username: ['', [Validators.required, Validators.minLength(5)]],
    email: [
      '',
      [Validators.required, appEmailValidator(DEFAULT_EMAIL_DOMAINS)],
    ],
    passGroup: this.fb.group(
      {
        password: ['', [Validators.required, Validators.minLength(5)]],
        rePassword: ['', [Validators.required]],
      },
      {
        validators: [matchPasswordsValidator('password', 'rePassword')],
      }
    ),
    img: ['', [Validators.required]],
  });

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}


  registerHandler(): void {
    if (this.form.invalid) {
      return;
    }

    const { username, email, img } = this.form.value;
    const password = this.form.get('passGroup.password')?.value; // Get the password from the nested form group

    this.authService.register(username!, email!, password!, img!).subscribe({
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
