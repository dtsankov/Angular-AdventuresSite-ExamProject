import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.services';

@Component({
  selector: 'app-new-adventure',
  templateUrl: './new-adventure.component.html',
  styleUrls: ['./new-adventure.component.css']
})
export class NewAdventureComponent {
  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private router: Router,
    private authService: AuthService
  ) {}

  form = this.fb.group({
    title: ['', [Validators.required, Validators.minLength(5)]],
    description: ['', [Validators.required, Validators.minLength(10)]],
    price: ['', [Validators.required, Validators.min(5)]],
    img: ['', [Validators.required]],
  });

  newAdventureHandler(): void {
    if (this.form.invalid) {
      return;
    }
    const { title, description, price, img } = this.form.value;
    const _ownerId = this.authService.user?._id;
    const adventure = { title, description, price, img, _ownerId };
    this.apiService.createAdventure(adventure).subscribe({
      next: () => this.router.navigate(['/adventures/catalog']),
      error: (err) => console.log(err),
    });
  }
}
