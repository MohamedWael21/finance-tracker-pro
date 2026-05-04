import { Component, inject, signal } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../../core/auth/auth.service';
import { LoginRequest } from '../../../types/types';
import { Button } from '../../../shared/components/ui/button/button';
import { Input as AppInput } from '../../../shared/components/ui/input/input';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, AppInput, Button],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  isLoading = signal(false);
  errorMessage = signal<string | null>(null);

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });

  getErrorMessage(controlName: string): string {
    const control = this.loginForm.get(controlName);
    if (control?.touched && control?.errors) {
      if (control.errors['required']) return `${controlName} is required`;
      if (control.errors['email']) return 'Invalid email format';
    }
    return '';
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.isLoading.set(true);
      this.errorMessage.set(null);
      this.authService.login(this.loginForm.value as LoginRequest).subscribe({
        next: () => {
          this.isLoading.set(false);
        },
        error: (err) => {
          this.errorMessage.set(err.message || 'Login failed. Please try again.');
          this.isLoading.set(false);
        },
      });
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
}
