import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthActivate } from './shared/guards/auth.activate';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    //component: HomeComponent,
  },
  {
    path: 'adventures/catalog',
    pathMatch: 'full',
    //component: ItemsListComponent,
  },
  {
    path: 'adventures/catalog/most-recent',
    pathMatch: 'full',
    //component: RecentItemsComponent,
  },
  {
    path: 'adventures/catalog/create',
    //component: NewItemComponent,
    data: {
      title: 'New Item',
      // loginRequired: true,
    },
  },
  {
    path: 'adventures/catalog/:id',
    pathMatch: 'full',
    //component: ItemDetailComponent,
    canActivate: [AuthActivate],
    data: {
      guest: false,
    },
  },
  {
    path: 'adventures/catalog/edit/:id',
    pathMatch: 'full',
    //component: ItemEditComponent,
    canActivate: [AuthActivate],
    data: {
      guest: false,
    },
  },
  {
    path: 'auth/profile',
   // component: ProfileComponent,
    canActivate: [AuthActivate],
    data: {
      title: 'Profile',
      guest: false,
    },
  },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})


export class AppRoutingModule { }
