import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from '../app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AppEmailDirective } from './validators/app-email.directive';



@NgModule({
  declarations: [
    AppEmailDirective,
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    ReactiveFormsModule,
  ],
  exports:[AppEmailDirective]
})
export class SharedModule { }
