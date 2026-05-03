import { TransactionType } from './transaction.model';

export interface TransactionFilters {
  page?: number;
  limit?: number;
  type?: TransactionType;
  category?: string;
  startDate?: string;
  endDate?: string;
  search?: string;
  sortBy?: string;
  order?: 'asc' | 'desc';
}
