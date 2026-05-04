import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


interface PaymentIntentResponse {
  success: boolean;
  clientSecret: string;
}

@Injectable({ providedIn: 'root' })
export class PaymentService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:5000/api/v1';

  createPaymentIntent(): Observable<PaymentIntentResponse> {
    return this.http.post<PaymentIntentResponse>(
      `${this.apiUrl}/payment/create-payment-intent`,
      {},
      { withCredentials: true } 
    );
  }
}
