import { Component, input } from '@angular/core';

const variants = {
  default: 'bg-primary/10 text-primary',
  secondary: 'bg-secondary/10 text-secondary',
  outline: 'border border-border text-foreground',
  destructive: 'bg-destructive/10 text-destructive',
  success: 'bg-secondary/10 text-secondary',
  warning: 'bg-yellow-500/10 text-yellow-600',
};

@Component({
  selector: 'app-badge',
  standalone: true,
  imports: [],
  templateUrl: './badge.html',
})
export class Badge {
  variant = input<keyof typeof variants>('default');
  styles = input<string>('');

  baseStyles = 'inline-flex items-center px-2 py-1 rounded-full text-xs font-medium';

  get variantClass(): string {
    return variants[this.variant()];
  }
}
