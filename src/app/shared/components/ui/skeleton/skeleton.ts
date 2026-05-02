import { Component, input } from '@angular/core';

@Component({
  selector: 'app-skeleton',
  standalone: true,
  templateUrl: './skeleton.html',
})
export class Skeleton {
  isLoading = input.required<boolean>();

  type = input<'text' | 'avatar' | 'card' | 'thumbnail'>('text');

  width = input<string>('');
  height = input<string>('');
  rounded = input<string>('');

  get classes(): string {
    switch (this.type()) {
      case 'avatar':
        return 'w-12 h-12 rounded-full';
      case 'card':
        return 'w-full h-40 rounded-xl';
      case 'thumbnail':
        return 'w-full h-24 rounded-lg';
      default:
        return 'w-full h-4 rounded-md';
    }
  }
}
