import { TransactionType } from '../../transactions/models/transaction.model';

export interface Category {
  _id: string;
  name: string;
  type: TransactionType;
  icon?: string;
  color?: string;
  isDefault?: boolean;
  user?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateCategoryDto {
  name: string;
  type: TransactionType;
  icon?: string;
  color?: string;
}
