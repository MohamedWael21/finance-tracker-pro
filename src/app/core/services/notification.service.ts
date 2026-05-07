import { Injectable, inject, signal, computed, DestroyRef } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { HttpClient } from '@angular/common/http';
import { Observable, interval } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { ToastService } from './toast.service';

export interface Notification {
  _id: string;
  user: string;
  title: 'budget_alert' | 'expense_added' | 'income_added';
  message: string;
  isRead: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
}

@Injectable({ providedIn: 'root' })
export class NotificationApiService {
  private http = inject(HttpClient);
  private toast = inject(ToastService);
  private destroyRef = inject(DestroyRef);
  private base = environment.notification;

  notifications = signal<Notification[]>([]);
  unreadCount = computed(() => this.notifications().filter((n) => !n.isRead).length);
  loading = signal(true);
  error = signal('');
  private hasInitialized = false;

  constructor() {
    this.startPolling();
  }

  private startPolling() {
    this.fetchNotifications();
    interval(10000)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.fetchNotifications();
      });
  }

  private fetchNotifications() {
    this.http.get<ApiResponse<Notification[]>>(this.base, { withCredentials: true }).subscribe({
      next: (res) => {
        const newNotifications = res.data || [];

        if (this.hasInitialized) {
          const currentIds = new Set(this.notifications().map((n) => n._id));
          newNotifications.forEach((n) => {
            if (!currentIds.has(n._id)) {
              this.toast.info(`New Alert: ${n.message}`);
            }
          });
        }
        this.notifications.set(newNotifications);
        this.loading.set(false);
        this.error.set('');
        this.hasInitialized = true;
      },
      error: (err) => {
        this.error.set(err?.error?.message || 'Failed to load notifications');
        this.loading.set(false);
      },
    });
  }

  getAll(): Observable<ApiResponse<Notification[]>> {
    return this.http.get<ApiResponse<Notification[]>>(this.base, { withCredentials: true }).pipe(
      tap((res) => {
        this.notifications.set(res.data || []);
      })
    );
  }

  markAsRead(id: string): Observable<ApiResponse<Notification>> {
    return this.http.patch<ApiResponse<Notification>>(`${this.base}/${id}/read`, {}, { withCredentials: true }).pipe(
      tap((res) => {
        this.notifications.update((list) =>
          list.map((n) => (n._id === id ? { ...n, isRead: res.data.isRead } : n))
        );
      })
    );
  }

  delete(id: string): Observable<ApiResponse<Notification>> {
    return this.http.delete<ApiResponse<Notification>>(`${this.base}/${id}`, { withCredentials: true }).pipe(
      tap(() => {
        this.notifications.update((list) => list.filter((n) => n._id !== id));
      })
    );
  }
}
