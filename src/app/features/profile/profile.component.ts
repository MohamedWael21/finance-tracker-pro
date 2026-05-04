import { Component, inject } from '@angular/core';
import { AuthService } from '../../core/auth/auth.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  template: `
    <div style="padding: 20px; max-width: 600px; margin: 50px auto; border: 1px solid #ddd; border-radius: 12px; text-align: center; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
      <h1 style="color: #333;">User Profile</h1>
      <div style="margin: 20px 0; font-size: 1.1rem; color: #666;">
        <p>Welcome to your private profile page!</p>
        <p>This page is protected by the AuthGuard.</p>
      </div>
      <button (click)="logout()" style="padding: 10px 25px; background: #dc3545; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: bold;">
        Logout
      </button>
    </div>
  `
})
export class ProfileComponent {
  private authService = inject(AuthService);

  logout() {
    this.authService.logout();
  }
}
