import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

interface PaymentIntentResponse {
  success: boolean;
  clientSecret: string;
}

interface UserResponse {
  success: boolean;
  user: any;
}

@Injectable({ providedIn: 'root' })
export class PaymentService {
  private http = inject(HttpClient);
  private apiUrl = environment.baseURL;

  createPaymentIntent(): Observable<PaymentIntentResponse> {
    return this.http.post<PaymentIntentResponse>(
      `${this.apiUrl}/payment/create-payment-intent`,
      {},
      { withCredentials: true },
    );
  }

  getUpdatedUser(): Observable<UserResponse> {
    return this.http.get<UserResponse>(`${this.apiUrl}/auth/me`, {
      withCredentials: true,
    });
  }
}
