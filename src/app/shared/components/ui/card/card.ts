import { Component, input } from '@angular/core';

@Component({
  selector: 'app-card',
  standalone: true,
  template: `
    <div
      [class]="
        'bg-card text-card-foreground border border-border rounded-xl shadow-sm overflow-hidden ' +
        styles()
      "
    >
      <ng-content />
    </div>
  `,
})
export class Card {
  styles = input<string>('');
}

@Component({
  selector: 'app-card-header',
  standalone: true,
  template: `<div class="p-6 pb-3 flex flex-col gap-1.5"><ng-content /></div>`,
})
export class CardHeader {}

@Component({
  selector: 'app-card-title',
  standalone: true,
  template: `<h3 class="font-semibold tracking-tight text-xl leading-none"><ng-content /></h3>`,
})
export class CardTitle {}

@Component({
  selector: 'app-card-content',
  standalone: true,
  template: `<div class="p-6 pt-0"><ng-content /></div>`,
})
export class CardContent {}

@Component({
  selector: 'app-card-footer',
  standalone: true,
  template: `<div class="p-6 pt-0 flex items-center"><ng-content /></div>`,
})
export class CardFooter {}
