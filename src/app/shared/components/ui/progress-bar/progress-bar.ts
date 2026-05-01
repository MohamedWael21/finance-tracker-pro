import { DecimalPipe } from '@angular/common';
import { Component, input, computed } from '@angular/core';

@Component({
  selector: 'app-progress-bar',
  standalone: true,
  imports: [DecimalPipe],
  templateUrl: './progress-bar.html',
})
export class ProgressBar {
  value = input.required<number>();
  max = input<number>(100);
  color = input<string>('');
  showLabel = input<boolean>(false);
  height = input<string>('h-3');

  percentage = computed(() => Math.min((this.value() / this.max()) * 100, 100));
  isExceeded = computed(() => this.value() > this.max());

  get barColor(): string {
    if (this.isExceeded()) return 'var(--destructive)';
    if (this.color()) return this.color();
    return 'var(--primary)';
  }
}
