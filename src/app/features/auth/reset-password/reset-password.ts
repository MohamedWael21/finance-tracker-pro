import { Component, inject, OnInit, signal } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../../core/auth/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Button } from '../../../shared/components/ui/button/button';
import { Input as AppInput } from '../../../shared/components/ui/input/input';

@Component({
  selector: 'app-reset-password',
  imports: [ReactiveFormsModule, AppInput, Button],
  templateUrl: './reset-password.html',
  styleUrl: './reset-password.css',
})
export class ResetPassword implements OnInit {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  isLoading = signal(false);
  errorMessage = signal<string | null>(null);
  successMessage = signal<string | null>(null);
  token: string | null = null;

  resetPasswordForm = this.fb.group({
    password: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['', [Validators.required]],
  });

  ngOnInit() {
    this.token = this.route.snapshot.paramMap.get('token') || this.route.snapshot.queryParamMap.get('token');
    console.log(this.token)
    if (!this.token) {
      this.errorMessage.set('Invalid or missing reset token.');
    }
  }

  getErrorMessage(controlName: string): string {
    const control = this.resetPasswordForm.get(controlName);
    if (control?.touched && control?.errors) {
      if (control.errors['required']) return `${controlName} is required`;
      if (control.errors['minlength']) return `${controlName} must be at least ${control.errors['minlength'].requiredLength} characters`;
    }
    return '';
  }

  onSubmit() {
    if (!this.token) {
      this.errorMessage.set('Cannot reset password without a valid token.');
      return;
    }

    if (this.resetPasswordForm.valid) {
      const { password, confirmPassword } = this.resetPasswordForm.value;
      
      if (password !== confirmPassword) {
        this.errorMessage.set('Passwords do not match');
        return;
      }

      this.isLoading.set(true);
      this.errorMessage.set(null);
      this.successMessage.set(null);

      this.authService.resetPasswordConfirm(this.token, password as string).subscribe({
        next: (res) => {
          this.isLoading.set(false);
          this.successMessage.set(res.message || 'Password reset successfully.');
          setTimeout(() => {
            this.router.navigate(['/auth/login']);
          }, 2000);
        },
        error: (err) => {
          this.errorMessage.set(err.message || 'Failed to reset password. Token may be invalid or expired.');
          this.isLoading.set(false);
        },
      });
    } else {
      this.resetPasswordForm.markAllAsTouched();
    }
  }
}
