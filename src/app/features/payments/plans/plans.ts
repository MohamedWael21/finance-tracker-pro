import { Component, OnInit, OnDestroy, signal, inject } from '@angular/core';
import { loadStripe, Stripe, StripeElements, StripeCardElement } from '@stripe/stripe-js';
import { PaymentService } from '../../../core/services/payment.service';
import { ToastService } from '../../../core/services/toast.service';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from '../../../shared/components/ui/card/card';
import { Button } from '../../../shared/components/ui/button/button';
import { Badge } from '../../../shared/components/ui/badge/badge';
import { Modal } from '../../../shared/components/ui/modal/modal';

@Component({
  selector: 'app-plans',
  standalone: true,
  imports: [Card, CardHeader, CardTitle, CardContent, CardFooter, Button, Badge , Modal],
  templateUrl: './plans.html',
  styleUrl: './plans.css',
})
export class Plans implements OnInit, OnDestroy {
  freeFeatures = [
    'Up to 50 transactions/month',
    'Basic budget tracking',
    'Standard categories',
    'Transaction history (30 days)',
  ];

  freeDisabled = [
    'Advanced reports & analytics',
    'Unlimited transactions',
    'Recurring transaction automation',
    'Export to CSV / PDF',
    'Priority support',
  ];

  premiumFeatures = [
    'Unlimited transactions',
    'Advanced reports & analytics',
    'Recurring transaction automation',
    'Full transaction history',
    'Export to CSV / PDF',
    'Priority support',
  ];

  private paymentService = inject(PaymentService);
  private toast = inject(ToastService);

  loading = signal(false);
  stripeReady = signal(false);
  cardError = signal('');
  showPaymentForm = signal(false);

  private stripe: Stripe | null = null;
  private elements: StripeElements | null = null;
  private cardElement: StripeCardElement | null = null;

  async ngOnInit() {
    this.stripe = await loadStripe(
      'pk_test_51Ra1GDBIFRrsbxAJyWrOejfU98jYdeM79hwCMlaAvKitqxBPnQmvZzFFsRTaEQqUpqng6w8Ul7TRqRSG3ciAZbqo00mhLruq3u',
    );

    if (this.stripe) {
      this.stripeReady.set(true);
    }
  }

  ngOnDestroy() {
    this.cardElement?.destroy();
  }

  async openPaymentForm() {
    this.showPaymentForm.set(true);
    this.cardError.set('');

    setTimeout(() => this.mountCard(), 0);
  }

  private mountCard() {
    if (!this.stripe) return;

    this.cardElement?.destroy();

    this.elements = this.stripe.elements();
    this.cardElement = this.elements.create('card', {
      style: {
        base: {
          fontSize: '16px',
          fontFamily: 'inherit',
          color: '#111827',
          '::placeholder': { color: '#9ca3af' },
        },
        invalid: { color: '#ef4444' },
      },
    });

    this.cardElement.mount('#card-element');

    this.cardElement.on('change', (event) => {
      this.cardError.set(event.error ? event.error.message : '');
    });
  }

  async handlePayment() {
    if (!this.stripe || !this.cardElement || this.loading()) return;
    if (this.cardError()) return;

    this.loading.set(true);

    this.paymentService.createPaymentIntent().subscribe({
      next: async ({ clientSecret }) => {
        const { error, paymentIntent } = await this.stripe!.confirmCardPayment(clientSecret, {
          payment_method: { card: this.cardElement! },
        });

        this.loading.set(false);

        if (error) {
          this.cardError.set(error.message ?? 'Payment failed');
          this.toast.error(error.message ?? 'Payment failed. Please try again.');
          return;
        }

        if (paymentIntent?.status === 'succeeded') {
          this.showPaymentForm.set(false);
          this.toast.success('🎉 Payment successful! You are now a Premium member.');
          // Optionally: call UserService to refresh user plan
        }
      },
      error: (err) => {
        this.loading.set(false);
        this.toast.error(err?.error?.message ?? 'Could not initiate payment. Please try again.');
      },
    });
  }

  cancelPayment() {
    this.showPaymentForm.set(false);
    this.cardError.set('');
    this.cardElement?.destroy();
    this.cardElement = null;
  }
}
