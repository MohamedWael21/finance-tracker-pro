// File: api.service.ts
// Purpose: Base API service for HTTP calls
// Imports: HttpClient, environment

// TODO: [Dev1]
// - Implement GET, POST, PATCH, DELETE
// - Add base URL from environment
// - Handle errors globally

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class ApiService {
  constructor(private http: HttpClient) {}

  get(url: string) {}
  post(url: string, body: any) {}
  patch(url: string, body: any) {}
  delete(url: string) {}
}
