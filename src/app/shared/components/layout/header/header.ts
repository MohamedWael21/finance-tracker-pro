import { Component, signal, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Button } from '../../ui/button/button';
import { LucideSearch, LucideBell, LucideUser, LucideCrown } from '@lucide/angular';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, Button, LucideSearch, LucideBell, LucideUser, LucideCrown],
  templateUrl: './header.html',
})
export class header {
  // placeholder
  userService = { isPremium: () => true };

  // placeholder
  notificationService = {
    unreadCount: () => 0,
    markAllAsRead: () => {},
    notifications: () => {
      return [
        {
          id: '1',
          message: 'Budget limit exceeded for "Food & Dining"',
          time: '2 hours ago',
          read: false,
        },
        {
          id: '2',
          message: 'New transaction: $45.20 at Grocery Store',
          time: '5 hours ago',
          read: true,
        },
      ];
    },
    markAsRead: (id: string) => id,
  };

  showNotifications = signal(false);
  showUserMenu = signal(false);

  toggleNotifications() {
    this.showNotifications.update((v) => !v);
    if (this.showNotifications()) {
      this.showUserMenu.set(false);
    }
  }

  toggleUserMenu() {
    this.showUserMenu.update((v) => !v);
    if (this.showUserMenu()) {
      this.showNotifications.set(false);
    }
  }
}
