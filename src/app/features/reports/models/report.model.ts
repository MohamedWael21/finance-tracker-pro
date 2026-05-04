export interface CategorySpending {
  category: string;
  amount: number;
}

export interface TrendData {
  date: string;
  amount: number;
}

export interface Report {
  totalIncome: number;
  totalExpense: number;
  balance: number;
  expensesByCategory: CategorySpending[];
  trend: TrendData[];
}
