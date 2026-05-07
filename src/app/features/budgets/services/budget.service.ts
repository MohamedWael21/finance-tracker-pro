import { Injectable, inject } from '@angular/core';
import { ApiService } from '../../../core/services/api.service';
import { Budget, CreateBudgetDto } from '../models/budget.model';
import { ApiResponse } from '../../../shared/models/api-response.model';
import { Observable } from 'rxjs';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BudgetService {
  private api = inject(ApiService);

  getBudgets(filters?: { month?: number; year?: number; search?: string }): Observable<ApiResponse<Budget[]>> {
    let params = new HttpParams();
    if (filters) {
      if (filters.month !== undefined) params = params.set('month', filters.month.toString());
      if (filters.year !== undefined) params = params.set('year', filters.year.toString());
      if (filters.search) params = params.set('search', filters.search);
    }
    return this.api.get<ApiResponse<Budget[]>>('/budgets', params);
  }

  createBudget(budget: CreateBudgetDto): Observable<ApiResponse<Budget>> {
    return this.api.post<ApiResponse<Budget>>('/budgets', budget);
  }

  updateBudget(id: string, budget: Partial<CreateBudgetDto>): Observable<ApiResponse<Budget>> {
    return this.api.put<ApiResponse<Budget>>(`/budgets/${id}`, budget);
  }

  deleteBudget(id: string): Observable<ApiResponse<null>> {
    return this.api.delete<ApiResponse<null>>(`/budgets/${id}`);
  }
}
