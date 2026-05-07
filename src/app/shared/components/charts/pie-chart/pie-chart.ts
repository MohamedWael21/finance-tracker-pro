import { Component, computed, input } from '@angular/core';
import { ChartData, ChartOptions } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card/card';
import { LucideAngularModule, PieChart as PieChartIcon } from 'lucide-angular';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.html',
  standalone: true,
  imports: [BaseChartDirective, Card, CardHeader, CardTitle, CardContent, LucideAngularModule],
})
export class PieChart {
  readonly PieChartIcon = PieChartIcon;
  title = input<string>('Spending by Category');
  labels = input<string[]>(['Food & Dining', 'Bills', 'Entertainment', 'Shopping', 'Transportation']);
  data = input<number[]>([500, 300, 150, 200, 400]);

  isEmpty = computed(() => {
    const d = this.data();
    return !d || d.length === 0 || d.every((v) => v === 0);
  });
  
  total = computed(() => this.data().reduce((acc, val) => acc + val, 0));

  colors = input<string[]>([
    '#7c3aed', 
    '#a855f7', 
    '#f59e0b', 
    '#ef4444', 
    '#10b981', 
  ]);

  chartData = computed<ChartData<'pie'>>(() => ({
    labels: this.labels(),
    datasets: [
      {
        data: this.data(),
        backgroundColor: this.colors(),
        borderColor: 'transparent',
        hoverBackgroundColor: this.colors(),
        hoverBorderColor: '#ffffff',
        hoverBorderWidth: 2,
      },
    ],
  }));

  chartOptions: ChartOptions<'pie'> = {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: 1000,
      easing: 'easeOutQuart',
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: '#1f2937',
        titleColor: '#ffffff',
        bodyColor: '#ffffff',
        padding: 12,
        cornerRadius: 8,
        displayColors: true,
        usePointStyle: true,
      },
    },
    hover: {
      mode: 'nearest',
      intersect: true,
    },
    layout: {
      padding: 40,
    },
  };

  chartPlugins = [
    {
      id: 'outLabels',
      afterDatasetsDraw: (chart: any) => {
        const { ctx, data } = chart;
        chart.data.datasets.forEach((dataset: any, i: number) => {
          chart.getDatasetMeta(i).data.forEach((datapoint: any, index: number) => {
            const { x, y } = datapoint;
            const label = data.labels[index];
            const color = dataset.backgroundColor[index];
            
            const midAngle = datapoint.startAngle + (datapoint.endAngle - datapoint.startAngle) / 2;
            
            const radius = datapoint.outerRadius + 20;
            const labelX = x + Math.cos(midAngle) * radius;
            const labelY = y + Math.sin(midAngle) * radius;
            
            ctx.save();
            ctx.font = '400 18px Inter';
            ctx.fillStyle = color;
            ctx.textAlign = (labelX > x) ? 'left' : 'right';
            ctx.textBaseline = 'middle';
            ctx.fillText(label, labelX, labelY);
            ctx.restore();
          });
        });
      }
    }
  ];
}
