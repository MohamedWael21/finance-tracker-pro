import { Component, input } from '@angular/core';

@Component({
  selector: 'app-page-header',
  imports: [],
  templateUrl: './page-header.html',
})
export class PageHeader {
  title = input.required<string>();
  subtitle = input<string>('');
}
