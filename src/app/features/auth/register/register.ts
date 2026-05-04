import { Component, inject, signal } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../../core/auth/auth.service';
import { RegisterRequest } from '../../../types/types';
import { Button } from '../../../shared/components/ui/button/button';
import { Input as AppInput } from '../../../shared/components/ui/input/input';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, AppInput, Button],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);

  isLoading = signal(false);
  errorMessage = signal<string | null>(null);

  registerForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['', [Validators.required]],
  });

  getErrorMessage(controlName: string): string {
    const control = this.registerForm.get(controlName);
    if (control?.touched && control?.errors) {
      if (control.errors['required']) return `${controlName} is required`;
      if (control.errors['email']) return 'Invalid email format';
      if (control.errors['minlength']) return `${controlName} must be at least ${control.errors['minlength'].requiredLength} characters`;   
    }
    return '';
  }

  onSubmit() {
    if (this.registerForm.valid) {
      const { confirmPassword, password } = this.registerForm.value;
      if (password !== confirmPassword) {
        this.errorMessage.set('Passwords do not match');
        return;
      }

      this.isLoading.set(true);
      this.errorMessage.set(null);

      const { confirmPassword: _, ...registerData } = this.registerForm.value;
      this.authService.register(registerData as RegisterRequest).subscribe({
        next: () => {
          this.isLoading.set(false);
        },
        error: (err) => {
          this.errorMessage.set(err.message || 'Registration failed. Please try again.');
          this.isLoading.set(false);
        },
      });
    } else {
      this.registerForm.markAllAsTouched();
    }
  }
}
