import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { handleHttpError } from '../../utils/http-error.utils';
import {
  UpdateProfilePayload,
  ChangePasswordPayload,
  UserProfileResponse,
  UpdateProfileResponse,
  AvatarResponse,
  MessageResponse,
} from '../../features/profile/models/types';

@Injectable({ providedIn: 'root' })
export class UserService {
  private http = inject(HttpClient);
  private baseUrl = environment.user;

  getProfile(): Observable<UserProfileResponse> {
    return this.http
      .get<UserProfileResponse>(`${this.baseUrl}/profile`, {
        withCredentials: true,
      })
      .pipe(catchError(handleHttpError));
  }

  updateProfile(payload: UpdateProfilePayload): Observable<UpdateProfileResponse> {
    return this.http
      .put<UpdateProfileResponse>(`${this.baseUrl}/profile`, payload, {
        withCredentials: true,
      })
      .pipe(catchError(handleHttpError));
  }

  uploadAvatar(file: File): Observable<AvatarResponse> {
    const formData = new FormData();
    formData.append('avatar', file);
    return this.http
      .put<AvatarResponse>(`${this.baseUrl}/profile/avatar`, formData, {
        withCredentials: true,
      })
      .pipe(catchError(handleHttpError));
  }

  deleteAvatar(): Observable<AvatarResponse> {
    return this.http
      .delete<AvatarResponse>(`${this.baseUrl}/profile/avatar`, {
        withCredentials: true,
      })
      .pipe(catchError(handleHttpError));
  }

  changePassword(payload: ChangePasswordPayload): Observable<MessageResponse> {
    return this.http
      .put<MessageResponse>(`${this.baseUrl}/profile/password`, payload, {
        withCredentials: true,
      })
      .pipe(catchError(handleHttpError));
  }

  deleteAccount(): Observable<MessageResponse> {
    return this.http
      .delete<MessageResponse>(`${this.baseUrl}/profile`, {
        withCredentials: true,
      })
      .pipe(catchError(handleHttpError));
  }
}
