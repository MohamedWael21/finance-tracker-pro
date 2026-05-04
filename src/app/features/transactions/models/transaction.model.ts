import { Category } from '../../categories/models/category.model';

export type TransactionType = 'income' | 'expense';

export interface Transaction {
  _id: string;
  amount: number;
  type: TransactionType;
  category: string | Category;
  description?: string;
  date: string;
  user: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateTransactionDto {
  amount: number;
  type: TransactionType;
  category: string;
  description?: string;
  date: string;
}

export interface UpdateTransactionDto extends Partial<CreateTransactionDto> {}
