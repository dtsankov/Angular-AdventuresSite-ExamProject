import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { AuthService } from '../auth/auth.services';
import { IAdventure } from '../interfaces/adventure';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  adventureList: IAdventure[] | null = null;

  constructor(
    private apiServices: ApiService,
    private authService: AuthService
  ) {}

  get user() {
    const { email, img } = this.authService.user!;
    return {
      email,
      img,
    };
  }

  ngOnInit(): void {
    this.apiServices.getAdventureByOwner().subscribe({
      next: (value) => {
        this.adventureList = value;
      },
      error: (err) => {
        console.error(err);
      },
    });
  }
}
