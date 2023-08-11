import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { IAdventure } from 'src/app/interfaces/adventure';

@Component({
  selector: 'app-most-recent',
  templateUrl: './most-recent.component.html',
  styleUrls: ['./most-recent.component.css']
})
export class MostRecentComponent implements OnInit {
  recentAdventures: IAdventure[] | null = null;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.loadRecentAdventures().subscribe({
      next: (value) => {
        this.recentAdventures = value;
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

}
