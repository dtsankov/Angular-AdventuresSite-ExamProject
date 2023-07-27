import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from '../app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MostRecentComponent } from './most-recent/most-recent.component';
import { AppEmailDirective } from './validators/app-email.directive';



@NgModule({
  declarations: [
    MostRecentComponent,
    AppEmailDirective,
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  exports:[MostRecentComponent,AppEmailDirective]
})
export class SharedModule { }
