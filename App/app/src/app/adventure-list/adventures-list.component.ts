import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { IAdventure } from '../interfaces/adventure';

@Component({
  selector: 'app-adventure-list',
  templateUrl: './adventures-list.component.html',
  styleUrls: ['./adventures-list.component.css']
})
export class AdventureListComponent implements OnInit {

  adventureList: IAdventure[] | null = null

  constructor(private apiServices:ApiService){}

  ngOnInit(): void {
    this.apiServices.loadAllAdventures().subscribe({
      next:(value)=>{
        this.adventureList = value
      },
      error: (err)=>{
        console.log(err);
        
      }
    })
  }

}
