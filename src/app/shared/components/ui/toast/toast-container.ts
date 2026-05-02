import { Component, inject } from '@angular/core';
import { ToastService, ToastType } from '../../../../core/services/toast.service';

@Component({
  selector: 'app-toast-container',
  standalone: true,
  templateUrl: './toast-container.html',
  styles: [`
    @keyframes slide-in {
      from { opacity: 0; transform: translateX(100%); }
      to { opacity: 1; transform: translateX(0); }
    }
    .animate-slide-in { animation: slide-in 0.25s ease-out; }
  `]
})
export class ToastContainer {
  toastService = inject(ToastService);

  toastClasses(type: ToastType): string {
    switch (type) {
      case 'success': return 'bg-emerald-50 border-emerald-200 text-emerald-800 dark:bg-emerald-950 dark:border-emerald-800 dark:text-emerald-200';
      case 'error':   return 'bg-red-50 border-red-200 text-red-800 dark:bg-red-950 dark:border-red-800 dark:text-red-200';
      default:        return 'bg-card border-border text-foreground';
    }
  }
}
