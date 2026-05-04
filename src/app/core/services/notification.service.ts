import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, pipe, repeat, switchMap, timer } from 'rxjs';
import { environment } from '../../../environments/environment';



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
  private base = environment.notification;

  getAll(): Observable<ApiResponse<Notification[]>> {
    return this.http.get<ApiResponse<Notification[]>>(this.base, { withCredentials: true });
  }

  markAsRead(id: string): Observable<ApiResponse<Notification>> {
    return this.http.patch<ApiResponse<Notification>>(`${this.base}/${id}/read`, {}, { withCredentials: true });
  }

  delete(id: string): Observable<ApiResponse<Notification>> {
    return this.http.delete<ApiResponse<Notification>>(`${this.base}/${id}`, { withCredentials: true });
  }
}
