import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { PageHeader } from '../../shared/components/ui/page-header/page-header';
import { LucideAngularModule, DollarSign, TrendingUp, TrendingDown, Plus, Inbox } from 'lucide-angular';
import { Card, CardContent, CardTitle } from '../../shared/components/ui/card/card';
import { Button } from '../../shared/components/ui/button/button';
import { BarChart } from '../../shared/components/charts/bar-chart/bar-chart';
import { DashboardService } from '../../core/services/dashboard.service';
import { IReport } from '../../core/interfaces/ireport';
import { PieChart } from '../../shared/components/charts/pie-chart/pie-chart';
import { Tabs } from '../../shared/components/ui/tabs/tabs';
import { TabPanel } from '../../shared/components/ui/tabs/tab-panel';
import { Input } from '../../shared/components/ui/input/input';
import { ITransaction } from '../../core/interfaces/itransaction';
import { DatePipe, TitleCasePipe } from '@angular/common';
import { TransactionForm } from '../transactions/transaction-form/transaction-form';
import { signal } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  imports: [
    PageHeader,
    Card,
    CardContent,
    CardTitle,
    LucideAngularModule,
    Button,
    BarChart,
    PieChart,
    DatePipe,
    TitleCasePipe,
    TransactionForm,
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard implements OnInit {
  private readonly _DashboardService = inject(DashboardService);
  private readonly _cdr = inject(ChangeDetectorRef);
  isModalOpen = signal(false);

  // ^ ============== variables =================
  reportData!: IReport;
  transationsList: ITransaction[] = [];

  icons = {
    DollarSign,
    TrendingUp,
    TrendingDown,
    Plus,
    Inbox,
  };

  title: string = 'Dashboard';
  subtitle: string = "Welcome back! Here's your financial overview.";

  labels: string[] = [
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
  incomeData: number[] = Array(12).fill(0);
  expenseData: number[] = Array(12).fill(0);
  pieChartLabels: string[] = [];
  pieChartData: number[] = [];

  datasets: any[] = [
    { label: 'Income', data: this.incomeData, color: '#10b981' },
    { label: 'Expenses', data: this.expenseData, color: '#ef4444' },
  ];

  lastMonthExp: number = 0;
  lastMonthInc: number = 0;
  lastMonthBalance: number = 0;

  // ^ ============== bar-chart data =================
  generateChartData(transactions: any[]) {
    this.incomeData = Array(12).fill(0);
    this.expenseData = Array(12).fill(0);

    transactions.forEach((transaction) => {
      const month = new Date(transaction.date).getMonth();

      if (transaction.type === 'income') {
        this.incomeData[month] += transaction.amount;
      }

      if (transaction.type === 'expense') {
        this.expenseData[month] += transaction.amount;
      }
    });

    this.datasets = [
      { label: 'Income', data: this.incomeData, color: '#10b981' },
      { label: 'Expenses', data: this.expenseData, color: '#ef4444' },
    ];
  }

  // ^ ============== pie-chart data =================
  generatePieChartData(transactions: any[]) {
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

    this.pieChartLabels = Object.keys(categoryMap);

    this.pieChartData = Object.values(categoryMap);
  }

  ngOnInit(): void {
    const today = new Date();
    this._DashboardService.getAllTransactions().subscribe({
      next: (res) => {
        this.transationsList = this._DashboardService.transactionData = res.data;

        this.generateChartData(this._DashboardService.transactionData);
        this.generatePieChartData(this._DashboardService.transactionData);

        this.lastMonthExp = this.expenseData[today.getMonth()];
        this.lastMonthInc = this.incomeData[today.getMonth()];
        this.lastMonthBalance = this.lastMonthInc - this.lastMonthExp;

        this._cdr.detectChanges();
      },
    });
  }

  onSaved() {
    this.ngOnInit();
  }
}
