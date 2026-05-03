import { Component } from '@angular/core';
import { PieChart } from '../../../shared/components/charts/pie-chart/pie-chart';

@Component({
  selector: 'app-dashboard',
  imports: [PieChart],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {}
