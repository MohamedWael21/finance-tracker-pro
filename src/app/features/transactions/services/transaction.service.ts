import { Injectable, inject } from '@angular/core';
import { ApiService } from '../../../core/services/api.service';
import { Transaction, CreateTransactionDto, UpdateTransactionDto } from '../models/transaction.model';
import { TransactionFilters } from '../models/transaction-filters.model';
import { Observable } from 'rxjs';
import { HttpParams } from '@angular/common/http';
import { ApiResponse } from '../../../shared/models/api-response.model';

export interface TransactionsListResponse {
  success: boolean;
  data: Transaction[];
  count?: number;
  total?: number;
}

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  private api = inject(ApiService);

  getTransactions(filters?: TransactionFilters): Observable<TransactionsListResponse> {
    let params = new HttpParams();
    
    if (filters) {
      // Pagination
      if (filters.page) params = params.set('page', filters.page.toString());
      if (filters.limit) params = params.set('limit', filters.limit.toString());
      
      // Global Search
      if (filters.search) params = params.set('search', filters.search);
      
      // Type and Category filters
      if (filters.type) params = params.set('type', filters.type);
      if (filters.category) params = params.set('category', filters.category);
      
      // Date Range
      if (filters.startDate) params = params.set('startDate', filters.startDate);
      if (filters.endDate) params = params.set('endDate', filters.endDate);
      
      // Amount Range
      if (filters.minAmount !== undefined) params = params.set('minAmount', filters.minAmount.toString());
      if (filters.maxAmount !== undefined) params = params.set('maxAmount', filters.maxAmount.toString());
      
      // Sorting
      if (filters.sortBy) params = params.set('sort', filters.sortBy);
    }

    return this.api.get<TransactionsListResponse>('/transactions', params);
  }

  createTransaction(transaction: CreateTransactionDto): Observable<ApiResponse<Transaction>> {
    return this.api.post<ApiResponse<Transaction>>('/transactions', transaction);
  }

  updateTransaction(id: string, transaction: UpdateTransactionDto): Observable<ApiResponse<Transaction>> {
    return this.api.put<ApiResponse<Transaction>>(`/transactions/${id}`, transaction); 
  }

  deleteTransaction(id: string): Observable<ApiResponse<null>> {
    return this.api.delete<ApiResponse<null>>(`/transactions/${id}`);
  }
}
