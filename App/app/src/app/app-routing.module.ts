import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthActivate } from './shared/guards/auth.activate';
import { HomeComponent } from './home/home.component';
import { AdventureListComponent } from './adventure-list/adventures-list.component';
import { MostRecentComponent } from './shared/most-recent/most-recent.component';
import { NewAdventureComponent } from './new-adventure/new-adventure.component';
import { AdventureDetailComponent } from './adventure-detail/adventure-detail.component';
import { AdventureEditComponent } from './adventure-edit/adventure-edit.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: HomeComponent,
  },
  
  {
    path: 'adventures/catalog',
    pathMatch: 'full',
    component: AdventureListComponent,
    //canActivate: [AuthActivate],

  },
  {
    path: 'adventures/catalog/most-recent',
    pathMatch: 'full',
    component: MostRecentComponent,
  },
  {
    path: 'adventures/catalog/create',
    pathMatch: 'full',
    component: NewAdventureComponent,
    //canActivate: [AuthActivate],
    data: {
      title: 'New Adventure',
      loginRequired: true,
    },
  },
  {
    path: 'adventures/catalog/:id',
    pathMatch: 'full',
    component: AdventureDetailComponent,
    //canActivate: [AuthActivate],
    data: {
      guest: false,
    },
  },
  {
    path: 'adventures/catalog/edit/:id',
    pathMatch: 'full',
    component: AdventureEditComponent,
    //canActivate: [AuthActivate],
    data: {
      guest: false,
    },
  },
  {
    path: 'auth/profile',
    component: ProfileComponent,
    //canActivate: [AuthActivate],
    data: {
      title: 'Profile',
      guest: false,
    },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
