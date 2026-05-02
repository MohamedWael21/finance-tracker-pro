// File: dashboard.component.ts
// Purpose: Main dashboard

// TODO: [Dev4]
// - Display income/expense
// - Add charts

import { Component, inject } from '@angular/core';
import { AuthService } from '../../core/auth/auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  template: `
    <h1>Dashboard</h1>
    <button (click)="logout()" style="padding: 10px; background: #dc3545; color: white; border: none; border-radius: 4px; cursor: pointer;">
      Logout
    </button>
  `
})
export class DashboardComponent {
  private authService = inject(AuthService);

  logout() {
    this.authService.logout();
  }
}
