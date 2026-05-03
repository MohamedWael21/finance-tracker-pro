import { Component, computed, input } from '@angular/core';
import { ChartData, ChartOptions } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card/card';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.html',
  standalone: true,
  imports: [BaseChartDirective, Card, CardHeader, CardTitle, CardContent],
})
export class LineChart {
  title = input<string>('Monthly Trends');
  labels = input<string[]>(['Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr']);
  incomeData = input<number[]>([4800, 5000, 5200, 5000, 5200, 4800, 5500]);
  expensesData = input<number[]>([3200, 3400, 3500, 3300, 3600, 3400, 3800]);
  savingsData = input<number[]>([1600, 1600, 1700, 1700, 1600, 1400, 1700]);

  chartData = computed<ChartData<'line'>>(() => ({
    labels: this.labels(),
    datasets: [
      {
        label: 'Income',
        data: this.incomeData(),
        borderColor: '#10b981',
        backgroundColor: '#10b981',
        pointBackgroundColor: '#ffffff',
        pointBorderColor: '#10b981',
        pointBorderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 6,
        tension: 0.4,
        borderWidth: 2,
        
      },
      {
        label: 'Expenses',
        data: this.expensesData(),
        borderColor: '#ef4444',
        backgroundColor: '#ef4444',
        pointBackgroundColor: '#ffffff',
        pointBorderColor: '#ef4444',
        pointBorderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 6,
        tension: 0.4,
        borderWidth: 2,
      },
      {
        label: 'Savings',
        data: this.savingsData(),
        borderColor: '#7c3aed',
        backgroundColor: '#7c3aed',
        pointBackgroundColor: '#ffffff',
        pointBorderColor: '#7c3aed',
        pointBorderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 6,
        tension: 0.4,
        borderWidth: 2,
      },
    ],
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
