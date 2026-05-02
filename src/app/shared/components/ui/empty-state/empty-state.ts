import { Component, input } from '@angular/core';

@Component({
  selector: 'app-empty-state',
  imports: [],
  templateUrl: './empty-state.html',
})
export class EmptyState {
  title = input.required<string>();
  description = input<string>('');
  iconBg = input<string>('bg-muted');
}
