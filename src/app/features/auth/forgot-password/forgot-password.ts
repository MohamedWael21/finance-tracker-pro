import { Component, inject, signal } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../../core/auth/auth.service';
import { Button } from '../../../shared/components/ui/button/button';
import { Input as AppInput } from '../../../shared/components/ui/input/input';

@Component({
  selector: 'app-forgot-password',
  imports: [ReactiveFormsModule, AppInput, Button],
  templateUrl: './forgot-password.html',
  styleUrl: './forgot-password.css',
})
export class ForgotPassword {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  isLoading = signal(false);
  errorMessage = signal<string | null>(null);
  successMessage = signal<string | null>(null);

  forgotPasswordForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
  });

  getErrorMessage(controlName: string): string {
    const control = this.forgotPasswordForm.get(controlName);
    if (control?.touched && control?.errors) {
      if (control.errors['required']) return `${controlName} is required`;
      if (control.errors['email']) return 'Invalid email format';
    }
    return '';
  }

  onSubmit() {
    if (this.forgotPasswordForm.valid) {
      this.isLoading.set(true);
      this.errorMessage.set(null);
      this.successMessage.set(null);
      const email = this.forgotPasswordForm.value.email as string;
      
      this.authService.resetPassword(email).subscribe({
        next: (res) => {
          this.isLoading.set(false);
          this.successMessage.set(res.message || 'Password reset link sent to your email.');
          this.forgotPasswordForm.reset();
        },
        error: (err) => {
          this.errorMessage.set(err.message || 'Failed to send reset link. Please try again.');
          this.isLoading.set(false);
        },
      });
    } else {
      this.forgotPasswordForm.markAllAsTouched();
    }
  }
}
