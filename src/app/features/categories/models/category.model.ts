import { TransactionType } from '../../transactions/models/transaction.model';

export interface Category {
  _id: string;
  type: string; 
  icon?: string;
  color?: string;
  isDefault?: boolean;
  user?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateCategoryDto {
  type: string;
  icon?: string;
  color?: string;
}
