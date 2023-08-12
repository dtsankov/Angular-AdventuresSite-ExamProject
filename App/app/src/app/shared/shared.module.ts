import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from '../app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AppEmailDirective } from './validators/app-email.directive';
import { LoaderComponent } from './loader/loader/loader.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';



@NgModule({
  declarations: [
    AppEmailDirective,
    LoaderComponent,
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    ReactiveFormsModule,
    MatProgressBarModule
  ],
  exports:[AppEmailDirective, LoaderComponent]
})
export class SharedModule { }
