import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../api.service';
import { AuthService } from '../auth/auth.services';
import { ActivatedRoute, Router } from '@angular/router';
import { IAdventure } from '../interfaces/adventure';

@Component({
  selector: 'app-adventure-edit',
  templateUrl: './adventure-edit.component.html',
  styleUrls: ['./adventure-edit.component.css'],
})
export class AdventureEditComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private router: Router,
    private authService: AuthService,
    private activatedRoute: ActivatedRoute
  ) {}

  id: string = '';
  adventure: IAdventure | null = null;
  token: string | null = localStorage.getItem('token');

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params['id'];
    this.apiService.loadAdventureById(this.id).subscribe({
      next: (adventure) => {
        this.adventure = adventure;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  form = this.fb.group({
    title: ['', [Validators.required, Validators.minLength(5)]],
    description: ['', [Validators.required, Validators.minLength(10)]],
    price: ['', [Validators.required, Validators.min(15)]],
  });

  updateAdventureHandler(): void {
    if (this.form.invalid) {
      return;
    }
    const { title, description, price } = this.form.value;
    const adventure = { title, description, price };

    this.apiService.updateAdventure(this.id, adventure).subscribe({
      next: () => this.router.navigate([`adventures/catalog/${this.id}`]),
      error: (err) => console.log(err),
    });
  }
}
