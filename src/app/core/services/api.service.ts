// File: api.service.ts
// Purpose: Base API service for HTTP calls
// Imports: HttpClient, environment

// TODO: [Dev1]
// - Implement GET, POST, PATCH, DELETE
// - Add base URL from environment
// - Handle errors globally

import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { handleHttpError } from '../../utils/http-error.utils';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private http = inject(HttpClient);

  get<T>(url: string): Observable<T> {
    return this.http
      .get<T>(`${environment.baseURL}${url}`, { withCredentials: true })
      .pipe(catchError(handleHttpError));
  }

  post<T>(url: string, body: any): Observable<T> {
    return this.http
      .post<T>(`${environment.baseURL}${url}`, body, { withCredentials: true })
      .pipe(catchError(handleHttpError));
  }

  patch<T>(url: string, body: any): Observable<T> {
    return this.http
      .patch<T>(`${environment.baseURL}${url}`, body, { withCredentials: true })
      .pipe(catchError(handleHttpError));
  }

  put<T>(url: string, body: any): Observable<T> {
    return this.http
      .put<T>(`${environment.baseURL}${url}`, body, { withCredentials: true })
      .pipe(catchError(handleHttpError));
  }

  delete<T>(url: string): Observable<T> {
    return this.http
      .delete<T>(`${environment.baseURL}${url}`, { withCredentials: true })
      .pipe(catchError(handleHttpError));
  }

}
