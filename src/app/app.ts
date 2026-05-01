import { Component, signal } from '@angular/core';
import { Tabs } from './shared/components/ui/tabs/tabs';
import { TabPanel } from './shared/components/ui/tabs/tab-panel';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
  imports: [Tabs, TabPanel],
})
export class App {
  protected readonly title = signal('finance-tracker-pro');
}
