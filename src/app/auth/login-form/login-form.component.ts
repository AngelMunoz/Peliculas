import { Component, Output, EventEmitter } from '@angular/core';
import { LoginPayload } from 'src/app/models/auth.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html'
})
export class LoginFormComponent {

  @Output() onLogin: EventEmitter<LoginPayload> = new EventEmitter();

  loginForm = new FormGroup({
    email: new FormControl('', { validators: [Validators.required] }),
    password: new FormControl('', [Validators.required]),
  });

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  onSubmit() {
    const value = { ...this.loginForm.value }
    this.onLogin.emit(value);
  }
}
