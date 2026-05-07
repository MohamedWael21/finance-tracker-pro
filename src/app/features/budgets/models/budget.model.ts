import { Category } from '../../categories/models/category.model';

export interface Budget {
  _id: string;
  amount: number;
  category?: string | Category;
  month: number;
  year: number;
  user: string;
  createdAt: string;
  updatedAt: string;
  spent?: number;
}

export interface CreateBudgetDto {
  amount: number;
  category?: string;
  month: number;
  year: number;
}
