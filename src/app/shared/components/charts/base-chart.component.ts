// File: base-chart.component.ts
// Purpose: Reusable chart wrapper

// TODO: [Dev2]
// - Support bar, line, pie charts
// - Make responsive

import { Component } from '@angular/core';

@Component({
  selector: 'app-base-chart',
  standalone: true,
  template: '<canvas></canvas>'
})
export class BaseChartComponent {}
