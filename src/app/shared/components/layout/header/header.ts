import { Component, signal, inject, computed, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Button } from '../../ui/button/button';
import { LucideSearch, LucideBell, LucideCrown, LucideMenu } from '@lucide/angular';
import { AuthService } from '../../../../core/auth/auth.service';
import {
  Notification,
  NotificationApiService,
} from '../../../../core/services/notification.service';
import { SidebarService } from '../../../../core/services/sidebar.service';
import { TimeAgoPipe } from '../../../pipes/time-ago';

const MAX_NUM_NOTIFICATIONS = 5;
@Component({
  selector: 'app-header',
  imports: [RouterLink, Button, LucideSearch, LucideBell, LucideCrown, LucideMenu, TimeAgoPipe],
  templateUrl: './header.html',
})
export class header implements OnInit {
  authService = inject(AuthService);
  notificationService = inject(NotificationApiService);
  sidebarService = inject(SidebarService);

  notifications = signal<Notification[] | null>(null);

  showNotifications = signal(false);
  showUserMenu = signal(false);

  isPremium = computed(() => {
    return this.authService.plan() === 'premium';
  });

  avatar = computed(() => {
    return this.authService.currentUser()?.avatar?.secure_url;
  });

  unreadCount = computed(() => {
    let count = 0;
    this.notifications()?.forEach((element) => {
      count += +(element.isRead === false);
    });
    return count;
  });

  ngOnInit(): void {
    this.getAllNotifications();
  }

  getAllNotifications() {
    this.notificationService.getAll().subscribe({
      next: ({ data }) => {
        this.notifications.set(data.slice(0, MAX_NUM_NOTIFICATIONS));
      },
    });
  }

  markAllAsRead() {
    this.notifications()?.map((notification) => {
      this.notificationService.markAsRead(notification._id).subscribe({
        next: ({ data }) => {
          this.updateNotification(data);
        },
      });
    });
  }

  markAsRead(id: string) {
    this.notificationService.markAsRead(id).subscribe({
      next: ({ data }) => {
        this.updateNotification(data);
      },
    });
  }

  updateNotification(newNotification: Notification) {
    this.notifications.update((prev) =>
      !prev
        ? null
        : prev?.map((notification) => {
            if (notification._id !== newNotification._id) return notification;
            return newNotification;
          }),
    );
  }

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

  handleLogout() {
    this.authService.logout();
  }
}
