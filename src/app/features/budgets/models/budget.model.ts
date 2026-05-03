import { Category } from '../../categories/models/category.model';

export interface Budget {
  _id: string;
  name: string;
  amount: number;
  category?: string | Category; 
  startDate: string;
  endDate: string;
  user: string;
  createdAt: string;
  updatedAt: string;
  spent?: number;
}

export interface CreateBudgetDto {
  name: string;
  amount: number;
  category?: string;
  startDate: string;
  endDate: string;
}
