import { Component, inject, signal, computed, OnInit } from '@angular/core';
import { NotificationApiService, Notification } from '../../../core/services/notification.service';
import { ToastService } from '../../../core/services/toast.service';
import { Card } from '../../../shared/components/ui/card/card';
import { Badge } from '../../../shared/components/ui/badge/badge';
import { Button } from '../../../shared/components/ui/button/button';
import { EmptyState } from '../../../shared/components/ui/empty-state/empty-state';
import { Skeleton } from '../../../shared/components/ui/skeleton/skeleton';
import { PageHeader } from '../../../shared/components/ui/page-header/page-header';

@Component({
  selector: 'app-notification-center',
  standalone: true,
  imports: [Card, Badge, Button, EmptyState, Skeleton, PageHeader],
  templateUrl: './notification-center.html',
})
export class NotificationCenter implements OnInit {
  private api = inject(NotificationApiService);
  private toast = inject(ToastService);

  notifications = this.api.notifications;
  loading = this.api.loading;
  error = this.api.error;
  actionLoading = signal('');

  unreadCount = this.api.unreadCount;

  ngOnInit() { }

  load() {
    this.api.getAll().subscribe();
  }

  markAsRead(notif: Notification) {
    this.actionLoading.set(notif._id + '-read');
    this.api.markAsRead(notif._id).subscribe({
      next: res => {
        this.actionLoading.set('');
        this.toast.success('Notification marked as read');
      },
      error: err => {
        this.actionLoading.set('');
        this.toast.error(err?.error?.message || 'Failed to mark as read');
      }
    });
  }

  deleteNotification(notif: Notification) {
    this.actionLoading.set(notif._id + '-delete');
    this.api.delete(notif._id).subscribe({
      next: () => {
        this.actionLoading.set('');
        this.toast.success('Notification deleted');
      },
      error: err => {
        this.actionLoading.set('');
        this.toast.error(err?.error?.message || 'Failed to delete notification');
      }
    });
  }

  titleLabel(title: Notification['title']): string {
    const map: Record<Notification['title'], string> = {
      budget_alert: 'Budget Alert',
      expense_added: 'Expense Added',
      income_added: 'Income Added',
    };
    return map[title] ?? title;
  }

  iconBg(title: Notification['title']): string {
    const map: Record<Notification['title'], string> = {
      budget_alert: 'bg-yellow-100',
      expense_added: 'bg-red-100',
      income_added: 'bg-emerald-100',
    };
    return map[title] ?? 'bg-muted';
  }

  formatDate(iso: string): string {
    const d = new Date(iso);
    const now = new Date();
    const diffMs = now.getTime() - d.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours}h ago`;
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  }
}
