import { Component, OnInit } from '@angular/core';
import { IAdventure } from '../interfaces/adventure';
import { ApiService } from '../api.service';
import { AuthService } from '../auth/auth.services';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-adventure-detail',
  templateUrl: './adventure-detail.component.html',
  styleUrls: ['./adventure-detail.component.css'],
})
export class AdventureDetailComponent implements OnInit {
  adventure!: IAdventure;
  owner: boolean = false;
  errors: Object | undefined;
  hasAdventure: boolean = false;
  token: string | null = localStorage.getItem('token');

  constructor(
    private apiService: ApiService,
    private authServices: AuthService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}
  ngOnInit(): void {
    let id = this.activatedRoute.snapshot.params['id'];
    this.apiService.loadAdventureById(id).subscribe({
      next: (adventure) => {
        this.adventure = adventure;
        this.hasAdventure = true;
        if (this.authServices.user?._id == adventure._ownerId) {
          this.owner = true;
        } else {
          this.owner = false;
        }
      },
      error: (err) => {
        this.errors = err.error?.error;
        console.log(err);
      },
    });
  }

  deleteAdventureHandler(): void {
    if (
      this.authServices.user?._id != this.adventure?._ownerId ||
      !this.token
    ) {
      this.router.navigate(['**']);
    } else {
      const id = this.adventure?._id;
      this.apiService.deleteAdventure(id).subscribe({
        next: () => this.router.navigate(['/adventures/catalog']),
        error: (err) => {
          console.log(err);
        },
      });
    }
  }
}
