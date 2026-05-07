import { Component, computed, input } from '@angular/core';
import { ChartData, ChartOptions } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card/card';
import { LucideAngularModule, LayoutList } from 'lucide-angular';

@Component({
  selector: 'app-horizontal-bar-chart',
  templateUrl: './horizontal-bar-chart.html',
  standalone: true,
  imports: [BaseChartDirective, Card, CardHeader, CardTitle, CardContent, LucideAngularModule],
})
export class HorizontalBarChart {
  readonly LayoutList = LayoutList;
  title = input<string>('Data Distribution');
  labels = input<string[]>([]);
  data = input<number[]>([]);
  color = input<string>('#7c3aed');

  isEmpty = computed(() => {
    const d = this.data();
    return !d || d.length === 0 || d.every((v) => v === 0);
  });

  chartData = computed<ChartData<'bar'>>(() => ({
    labels: this.labels(),
    datasets: [
      {
        data: this.data(),
        backgroundColor: this.color(),
        borderRadius: 12,
        borderSkipped: false,
        barThickness: 45,
      },
    ],
  }));

  chartOptions: ChartOptions<'bar'> = {
    indexAxis: 'y',
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: '#1f2937',
        titleFont: { family: 'Inter', size: 13, weight: 600 },
        bodyFont: { family: 'Inter', size: 12 },
        padding: 12,
        cornerRadius: 8,
        displayColors: false,
      },
    },
    scales: {
      x: {
        beginAtZero: true,
        grid: {
          color: '#f3f4f6',
          lineWidth: 1,
        },
        ticks: {
          font: { family: 'Inter', size: 13 },
          color: '#6b7280',
          stepSize: 300,
        },
        border: {
          display: false,
        },
      },
      y: {
        grid: {
          display: false,
        },
        ticks: {
          font: { family: 'Inter', size: 13 },
          color: '#374151',
        },
        border: {
          display: false,
        },
      },
    },
  };
}
