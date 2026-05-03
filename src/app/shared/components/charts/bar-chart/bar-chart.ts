import { Component, computed, input } from '@angular/core';
import { ChartData, ChartOptions } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card/card';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.html',
  standalone: true,
  imports: [BaseChartDirective, Card, CardHeader, CardTitle, CardContent],
})
export class BarChart {
  title = input<string>('Income vs Expenses');
  labels = input<string[]>(['Jan', 'Feb', 'Mar', 'Apr']);
  incomeData = input<number[]>([4000, 4500, 3800, 5200]);
  expensesData = input<number[]>([5000, 5200, 4800, 5500]);

  chartData = computed<ChartData<'bar'>>(() => ({
    labels: this.labels(),
    datasets: [
      {
        label: 'Income',
        data: this.incomeData(),
        backgroundColor: '#10b981',
        borderRadius: 8,
        borderSkipped: false,
        barThickness: 50,
      },
      {
        label: 'Expenses',
        data: this.expensesData(),
        backgroundColor: '#ef4444',
        borderRadius: 8,
        borderSkipped: false,
        barThickness: 50,
      },
    ],
  }));

  chartOptions: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: 1000,
      easing: 'easeOutQuart',
    },
    plugins: {
      legend: {
        display: true,
        position: 'bottom',
        align: 'center',
        labels: {
          usePointStyle: true,
          pointStyle: 'rectRounded',
          padding: 25,
          font: {
            family: 'Inter',
            size: 14,
            weight: 500,
          },
          color: '#374151',
        },
      },
      tooltip: {
        backgroundColor: '#1f2937',
        titleFont: { family: 'Inter', size: 13, weight: 600 },
        bodyFont: { family: 'Inter', size: 12 },
        padding: 12,
        cornerRadius: 8,
        displayColors: true,
        usePointStyle: true,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          font: {
            family: 'Inter',
            size: 13,
          },
          color: '#6b7280',
        },
        border: {
          display: false,
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          color: '#f3f4f6',
          lineWidth: 1,
        },
        ticks: {
          font: {
            family: 'Inter',
            size: 13,
          },
          color: '#6b7280',
          stepSize: 1500,
        },
        border: {
          display: false,
        },
      },
    },
  };
}
