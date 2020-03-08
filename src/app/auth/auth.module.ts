import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { LoginFormComponent } from './login-form/login-form.component';
import { AuthPageComponent } from './auth-page/auth-page.component';



@NgModule({
  declarations: [LoginFormComponent, AuthPageComponent],
  exports: [AuthPageComponent],
  providers: [],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule
  ]
})
export class AuthModule { }
