import { Component, input, signal, HostBinding } from '@angular/core';

@Component({
  selector: 'app-tab-panel',
  standalone: true,
  template: `<ng-content />`,
})
export class TabPanel {
  tabId = input.required<string>();

  active = signal<boolean>(false);

  @HostBinding('hidden')
  get hidden(): boolean {
    return !this.active();
  }
}
