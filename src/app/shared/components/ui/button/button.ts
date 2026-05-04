import { Component, input, output } from '@angular/core';

const variants = {
  primary: 'bg-primary text-primary-foreground hover:bg-primary/90',
  secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/90',
  outline: 'border-2 border-border bg-card hover:bg-accent',
  ghost: 'hover:bg-accent',
  danger: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
};

const sizes = {
  sm: 'px-3 py-1.5 gap-1.5',
  md: 'px-4 py-2 gap-2',
  lg: 'px-6 py-3 gap-2',
};
@Component({
  selector: 'app-button',
  imports: [],
  templateUrl: './button.html',
})
export class Button {
  variant = input<keyof typeof variants>('primary');
  size = input<keyof typeof sizes>('md');
  fullWidth = input<boolean>(false);
  type = input<'button' | 'submit' | 'reset'>('button');
  click = output<Event>();

  baseStyles =
    'inline-flex items-center justify-center rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer';

  get widthClass() {
    return this.fullWidth() ? 'w-full' : '';
  }

  get variantClass() {
    return variants[this.variant()];
  }
  get sizeClass() {
    return sizes[this.size()];
  }

  handleClick(event: Event) {
    this.click.emit(event);
  }
}
