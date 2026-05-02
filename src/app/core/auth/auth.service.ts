// File: auth.service.ts
// Purpose: Handle authentication
// Imports: ApiService

// TODO: [Dev1]
// - Implement login/register/logout
// - Store token in localStorage
// - Handle current user

import { inject, Injectable } from '@angular/core';
import { ApiService } from '../services/api.service';
import { AuthResponse, User } from '../../types/user';
import { Router } from '@angular/router';
import { getCookies, setCookies } from '../../utils/cookie.utils';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiService = inject(ApiService);
  private router = inject(Router);
  

  login(credentials: Partial<User>) {
    this.apiService.post<AuthResponse>('/auth/login', credentials).subscribe({
      next:(res)=> {
        console.log(res);;
        this.router.navigate(['/profile']);
      },
      error(err) {
        console.log(err);
        alert(err.message);
      },
    });

  }

  register(data: Partial<User>) {
    this.apiService.post<AuthResponse>('/auth/register', data).subscribe({
      next:(res)=> {
        console.log(res);
        this.router.navigate(['/login']);
      },
      error(err) {
        console.log(err);
        alert(err.message);
      },
    });
  }
  logout() {
    this.apiService.post('/auth/logout', {}).subscribe({
      next:(res)=> {
        console.log(res);
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.log(err);
        this.router.navigate(['/login']);
      },
    });

  }

  isLoggedIn() {
    const token = getCookies('token')
    if(token) return token;
    return false;
  }


}
