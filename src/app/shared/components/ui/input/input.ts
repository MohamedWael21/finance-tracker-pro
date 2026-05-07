import { Component, input, model } from '@angular/core';

@Component({
  selector: 'app-input',
  imports: [],
  templateUrl: './input.html',
})
export class Input {
  label = input<string>('');
  placeholder = input<string>('');
  type = input<string>('text');
  value = model<any>('');
  title = input<string>('');
  error = input<string>('');
  disabled = input<boolean>(false);
  required = input<boolean>(false);
  name = input<string>('');
  id = input<string>(`input-${Math.random().toString(36).slice(2)}`);

  baseInputStyles =
    'w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-ring bg-background text-foreground transition-colors';

  get inputStyles(): string {
    return `${this.baseInputStyles} ${this.error() ? 'border-destructive focus:ring-destructive' : 'border-border'}`;
  }

  handleInput(event: Event) {
    const target = event.target as HTMLInputElement;
    if (this.type() !== 'number') {
      this.value.set(target.value);
      return;
    }

    if (target.value === '') {
      this.value.set(null);
      return;
    }

    const numericValue = Number(target.value);
    this.value.set(Number.isFinite(numericValue) ? numericValue : null);
  }
}
