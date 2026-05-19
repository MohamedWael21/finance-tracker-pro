import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { Crown, LucideAngularModule } from 'lucide-angular';
import { Badge } from '../../../shared/components/ui/badge/badge';
import { Card } from '../../../shared/components/ui/card/card';
import { HorizontalBarChart } from '../../../shared/components/charts/horizontal-bar-chart/horizontal-bar-chart';
import { DashboardService } from '../../../core/services/dashboard.service';
import { LineChart } from '../../../shared/components/charts/line-chart/line-chart';

@Component({
  selector: 'app-reports',
  imports: [LucideAngularModule, Badge, Card, HorizontalBarChart, LineChart],
  templateUrl: './reports.html',
  styleUrl: './reports.css',
})
export class Reports implements OnInit {
  private readonly _DashboardService = inject(DashboardService);
  private readonly _cdr = inject(ChangeDetectorRef);

  // ^ ================= variables ====================
  title: string = 'Reports';
  subtitle: string = 'Advanced analytics and insights';

  icons = {
    Crown,
  };

  // ^ ================= horizontal bar chart variables ====================
  avgIncome = 0;
  avgExpenses = 0;
  avgSavings = 0;
  savingsRate = 0;

  chartLabels: string[] = [];
  chartData: number[] = [];

  // ^ ================= line chart variables ====================
  lineChartLabels: string[] = [];

  incomeTrendData: number[] = Array(12).fill(0);
  expenseTrendData: number[] = Array(12).fill(0);
  savingsTrendData: number[] = Array(12).fill(0);

  trendDatasets: any[] = [
    { label: 'Income', data: this.incomeTrendData, color: '#22c55e' },
    { label: 'Expenses', data: this.expenseTrendData, color: '#ef4444' },
    { label: 'Savings', data: this.savingsTrendData, color: '#4f46e5' },
  ];

  ngOnInit(): void {
    this._DashboardService.getAllTransactions().subscribe({
      next: (res) => {
        const transactions = res.data;

        this.calculateReportData(transactions);
        this.generateCategoryChart(transactions);
        this.generateLineChartData(transactions);
        this._cdr.detectChanges();
      },
    });
  }

  // ^ ================= horizontal bar chart functions ====================
  calculateReportData(transactions: any[]) {
    let totalIncome = 0;
    let totalExpenses = 0;

    const months = new Set<string>();

    transactions.forEach((transaction) => {
      const date = new Date(transaction.date);

      const monthKey = `${date.getFullYear()}-${date.getMonth()}`;

      months.add(monthKey);

      if (transaction.type === 'income') {
        totalIncome += transaction.amount;
      }

      if (transaction.type === 'expense') {
        totalExpenses += transaction.amount;
      }
    });

    const totalMonths = months.size || 1;

    this.avgIncome = totalIncome / totalMonths;

    this.avgExpenses = totalExpenses / totalMonths;

    this.avgSavings = this.avgIncome - this.avgExpenses;

    this.savingsRate = (this.avgSavings / this.avgIncome) * 100;

    this.savingsRate = isNaN(this.savingsRate) ? 0 : this.savingsRate;
  }

  generateCategoryChart(transactions: any[]) {
    const categoryMap: { [key: string]: number } = {};

    transactions.forEach((transaction) => {
      if (transaction.type === 'expense' && transaction.category) {
        const category = transaction.category.type;

        if (categoryMap[category]) {
          categoryMap[category] += transaction.amount;
        } else {
          categoryMap[category] = transaction.amount;
        }
      }
    });

    this.chartLabels = Object.keys(categoryMap);

    this.chartData = Object.values(categoryMap);
  }

  // ^ ================= line chart function ====================
  generateLineChartData(transactions: any[]) {
    const currentYear = new Date().getFullYear();

    const monthlyIncome = Array(12).fill(0);

    const monthlyExpenses = Array(12).fill(0);

    transactions.forEach((transaction) => {
      const date = new Date(transaction.date);

      if (date.getFullYear() !== currentYear) {
        return;
      }

      const month = date.getMonth();

      if (transaction.type === 'income') {
        monthlyIncome[month] += transaction.amount;
      }

      if (transaction.type === 'expense') {
        monthlyExpenses[month] += transaction.amount;
      }
    });

    this.lineChartLabels = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];

    this.incomeTrendData = monthlyIncome;

    this.expenseTrendData = monthlyExpenses;

    this.savingsTrendData = monthlyIncome.map((income, index) => income - monthlyExpenses[index]);

    this.trendDatasets = [
      { label: 'Income', data: this.incomeTrendData, color: '#22c55e' },
      { label: 'Expenses', data: this.expenseTrendData, color: '#ef4444' },
      { label: 'Savings', data: this.savingsTrendData, color: '#4f46e5' },
    ];
  }
}
