import { Component, input } from '@angular/core';

@Component({
  selector: 'app-card',
  imports: [],
  templateUrl: './card.html',
})
export class Card {
  styles = input<string>('');
  baseStyles = 'bg-card border border-border rounded-xl shadow-sm';
}
