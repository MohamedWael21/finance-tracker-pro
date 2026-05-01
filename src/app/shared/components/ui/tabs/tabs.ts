import { Component, input, signal, effect, contentChildren } from '@angular/core';
import { TabPanel } from './tab-panel';

export interface Tab {
  id: string;
  label: string;
}

@Component({
  selector: 'app-tabs',
  standalone: true,
  templateUrl: './tabs.html',
})
export class Tabs {
  tabs = input.required<Tab[]>();
  initialTab = input<string>('');

  activeTab = signal<string>('');

  panels = contentChildren(TabPanel);

  constructor() {
    effect(() => {
      const tabs = this.tabs();
      if (tabs.length && !this.activeTab()) {
        this.activeTab.set(this.initialTab() || tabs[0].id);
      }
    });

    effect(() => {
      const active = this.activeTab();
      this.panels().forEach((panel) => {
        panel.active.set(panel.tabId() === active);
      });
    });
  }

  selectTab(id: string) {
    this.activeTab.set(id);
  }

  isActive(id: string): boolean {
    return this.activeTab() === id;
  }
}
