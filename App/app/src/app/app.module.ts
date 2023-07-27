import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { AuthModule } from './auth/auth.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { appInterceptorProvider } from './app.interceptor';
import { CoreModule } from './core/core.module';
import { HomeComponent } from './home/home.component';
import { SharedModule } from './shared/shared.module';
import { AdventureDetailComponent } from './adventure-detail/adventure-detail.component';
import { AdventureEditComponent } from './adventure-edit/adventure-edit.component';
import { AdventureListComponent } from './adventure-list/adventures-list.component';
import { NewAdventureComponent } from './new-adventure/new-adventure.component';
import { ProfileComponent } from './profile/profile.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AdventureDetailComponent,
    AdventureEditComponent,
    AdventureListComponent,
    NewAdventureComponent,
    ProfileComponent,
    
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    CoreModule,
    HttpClientModule,
    SharedModule,
    AuthModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
  ],
  providers: [appInterceptorProvider],
  bootstrap: [AppComponent]
})
export class AppModule { }
