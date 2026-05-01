import { Component, model, input, output } from '@angular/core';

const sizes = {
  sm: 'max-w-md',
  md: 'max-w-lg',
  lg: 'max-w-2xl',
};

@Component({
  selector: 'app-modal',
  standalone: true,
  templateUrl: './modal.html',
})
export class Modal {
  isOpen = model<boolean>(false);

  title = input<string>('');

  size = input<keyof typeof sizes>('sm');

  closed = output<void>();

  get sizeClass() {
    return sizes[this.size()];
  }

  close() {
    this.isOpen.set(false);
    this.closed.emit();
  }

  stopEventPropagation(e: Event) {
    e.stopPropagation();
  }
}
