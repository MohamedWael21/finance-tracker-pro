import { inject, Injectable, signal, computed } from '@angular/core';
import { ApiService } from '../services/api.service';
import { AuthResponse, User, LoginRequest, RegisterRequest, GenericAuthResponse } from '../../types/types';
import { Router } from '@angular/router';
import { deleteCookies } from '../../utils/cookie.utils';
import { tap, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiService = inject(ApiService);
  private router = inject(Router);

  private _currentUser = signal<User | null>(null);

  readonly currentUser = computed(() => this._currentUser());

  plan = computed(() => this._currentUser()?.plan || 'free');

  constructor() {
    this.rehydrateUser();
  }

  private rehydrateUser() {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        this._currentUser.set(JSON.parse(storedUser));
      } catch (e) {
        console.error('Failed to parse stored user', e);
        localStorage.removeItem('user');
      }
    }
  }

  login(credentials: LoginRequest): Observable<AuthResponse> {
    return this.apiService.post<AuthResponse>('/auth/login', credentials).pipe(
      tap((res) => {
        this.handleAuthSuccess(res);
      })
    );
  }

  register(data: RegisterRequest): Observable<AuthResponse> {
    return this.apiService.post<AuthResponse>('/auth/register', data).pipe(
      tap(() => {
        this.router.navigate(['/auth/login']);
      })
    );
  }

  updateUserPlan(updatedUser?: Partial<User>) {
    this._currentUser.update((user) => {
      if (user) {
        return { ...user, plan: 'premium', ...updatedUser };
      }
      return user;
    });
  }

  resetPassword(email: string): Observable<GenericAuthResponse> {
    return this.apiService.post<GenericAuthResponse>('/auth/reset-password', { email });
  }

  resetPasswordConfirm(token: string, password: string): Observable<GenericAuthResponse> {
    return this.apiService.post<GenericAuthResponse>(`/auth/reset-password-confirm/${token}`, { password });
  }

  private handleAuthSuccess(res: AuthResponse) {
    localStorage.setItem('user', JSON.stringify(res.user));
    this._currentUser.set(res.user);
    this.router.navigate(['/']);
  }

  logout() {
    this.apiService.post('/auth/logout', {}).subscribe({
      next: () => this.handleLogout(),
      error: () => this.handleLogout(),
    });
  }

  private handleLogout() {
    deleteCookies('token');
    localStorage.removeItem('user');
    this._currentUser.set(null);
    this.router.navigate(['/auth/login']);
  }

  isLoggedIn() {
    return !!this._currentUser();
  }
}
