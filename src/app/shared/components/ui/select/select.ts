import { Component, input, model } from '@angular/core';

export interface SelectOption {
  label: string;
  value: string | number;
}

@Component({
  selector: 'app-select',
  standalone: true,
  imports: [],
  templateUrl: './select.html',
})
export class Select {
  label = input<string>('');
  options = input.required<SelectOption[]>();
  value = model<string | number>('');
  error = input<string>('');
  disabled = input<boolean>(false);
  placeholder = input<string>('');
  id = input<string>(`select-${Math.random().toString(36).slice(2)}`);

  baseSelectStyles =
    'w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-ring bg-background text-foreground transition-colors cursor-pointer';

  get selectStyles(): string {
    return `${this.baseSelectStyles} ${this.error() ? 'border-destructive focus:ring-destructive' : 'border-border'}`;
  }

  onChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    this.value.set(target.value);
  }
}
