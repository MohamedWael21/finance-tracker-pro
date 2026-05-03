import { Component } from '@angular/core';
import { PieChart } from '../../../shared/components/charts/pie-chart/pie-chart';
import { BarChart } from '../../../shared/components/charts/bar-chart/bar-chart';

@Component({
  selector: 'app-dashboard',
  imports: [PieChart, BarChart],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {}
