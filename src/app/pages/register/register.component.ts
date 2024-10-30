import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormsModule,
  ReactiveFormsModule,
  AbstractControl,
  ValidatorFn,
} from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { NgIf } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, NgIf],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  registerForm: FormGroup = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
    confirmPassword: new FormControl('', [
      Validators.required,
      this.matchPassword(),
    ]),
  });

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    // this.registerForm =
  }

  matchPassword(): ValidatorFn {
    return () => {
      if (
        this.registerForm.value.get('password').value &&
        this.registerForm.value.get('password').value !==
          this.registerForm.value.get('confirmPassword').value
      ) {
        return { mismatch: true };
      }
      return null;
    };
  }

  get firstName() {
    return this.registerForm.get('firstName');
  }
  get lastName() {
    return this.registerForm.get('lastName');
  }
  get email() {
    return this.registerForm.get('email');
  }
  get password() {
    return this.registerForm.get('password');
  }
  get confirmPassword() {
    return this.registerForm.get('confirmPassword');
  }

  register() {
    if (
      this.registerForm.valid &&
      this.email &&
      this.password &&
      this.firstName &&
      this.lastName &&
      this.matchPassword()
    ) {
      this.authService.register(
        this.email.value,
        this.password.value,
        `${this.firstName.value} ${this.lastName.value}`
      ).subscribe({
        next: (user) => {
          console.log('User', user);
          this.registerForm.reset();
          this.router.navigate(['/']);

        },
        error: (error) => {
          console.log('Error', error);

        },
      });
    } else {
      console.log('Invalid form');
    }
  }
}
