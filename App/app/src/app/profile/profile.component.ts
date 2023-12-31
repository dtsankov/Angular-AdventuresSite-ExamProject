import { Component, NgModule, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { AuthService } from '../auth/auth.services';
import { IAdventure } from '../interfaces/adventure';
import { FormBuilder, Validators } from '@angular/forms';
import { DEFAULT_EMAIL_DOMAINS } from '../shared/constants';
import { appEmailValidator } from '../shared/validators/app-email-validator';
import { Router } from '@angular/router';
import { logoutSession } from '../shared/session/session';


interface Profile {
  username : string;
  email:string;
  img:string;
}


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  adventureList: IAdventure[] | null = null;

  isEditMode: boolean = false;
  isLoading : boolean = true


  profileDetails: Profile = {
    username: this.user.username,
    email: this.user.email,
    img: this.user.img
     
  };


  form = this.fb.group({
    username: ['', [Validators.required, Validators.minLength(5)]],
    email: [
      '',
      [Validators.required, appEmailValidator(DEFAULT_EMAIL_DOMAINS)],
    ],
    img: [''],
  });
 


  constructor(
    private apiServices: ApiService,
    private authService: AuthService,
    private fb : FormBuilder,
    private router : Router
  ) {}

  get user() {
    const {username,email, img } = this.authService.user!;

 
    
    return {
      
      username,
      email,
      img,
    };
  }

  ngOnInit(): void {
    
    this.apiServices.getAdventureByOwner().subscribe({
      next: (value) => {
        this.adventureList = value;
        setTimeout(() => {
          this.isLoading = false;
        }, 300)
      },
      error: (err) => {
        console.error(err);
      },
    })
  }

  toggleEditMode(): void {
    this.isEditMode = !this.isEditMode;
  }
  updateProfileHandler(): void {
    if (this.form.invalid) {
      return;
    }
    const { username, email, img } = this.form.value;
    const profile = {username,email,img}

    this.apiServices.updateProfile(profile).subscribe({
      next: () => this.authService.logout(),
      error: (err) => console.log(err),
    });

    this.profileDetails = { ...this.form.value } as Profile;

    this.toggleEditMode();
  }

  
}


