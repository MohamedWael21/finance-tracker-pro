import { Component, computed, input } from '@angular/core';
import { ChartData, ChartOptions } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card/card';

export interface ChartSeries {
  label: string;
  data: number[];
  color: string;
}

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.html',
  standalone: true,
  imports: [BaseChartDirective, Card, CardHeader, CardTitle, CardContent],
})
export class LineChart {
  title = input<string>('Trends Overview');
  labels = input<string[]>([]);
  datasets = input<ChartSeries[]>([]);

  chartData = computed<ChartData<'line'>>(() => ({
    labels: this.labels(),
    datasets: this.datasets().map((ds) => ({
      label: ds.label,
      data: ds.data,
      borderColor: ds.color,
      backgroundColor: ds.color,
      pointBackgroundColor: '#ffffff',
      pointBorderColor: ds.color,
      pointBorderWidth: 2,
      pointRadius: 4,
      pointHoverRadius: 6,
      tension: 0.4,
      borderWidth: 2,
    })),
  }));

  chartOptions: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: 'index',
      intersect: false,
    },
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          usePointStyle: true,
          pointStyle: 'circle',
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
        backgroundColor: '#ffffff',
        titleColor: '#1f2937',
        titleFont: { family: 'Inter', size: 16, weight: 600 },
        bodyFont: { family: 'Inter', size: 14 },
        bodySpacing: 8,
        padding: 16,
        cornerRadius: 8,
        borderColor: '#e5e7eb',
        borderWidth: 1,
        displayColors: false, 
        callbacks: {
          label: (context) => {
            return `${context.dataset.label} : ${context.parsed.y}`;
          },
          labelTextColor: (context) => {
            return (context.dataset.borderColor as string) || '#1f2937';
          }
        }
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          font: { family: 'Inter', size: 13 },
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
        },
        ticks: {
          font: { family: 'Inter', size: 13 },
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
