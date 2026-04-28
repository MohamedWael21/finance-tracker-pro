// File: auth.service.ts
// Purpose: Handle authentication
// Imports: ApiService

// TODO: [Dev1]
// - Implement login/register/logout
// - Store token in localStorage
// - Handle current user

import { Injectable } from '@angular/core';
import { ApiService } from '../services/api.service';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private api: ApiService) {}

  login(data: any) {}
  register(data: any) {}
  logout() {}
}
