import { Injectable, inject } from '@angular/core';
import { ApiService } from '../../../core/services/api.service';
import { Category, CreateCategoryDto } from '../models/category.model';
import { ApiResponse } from '../../../shared/models/api-response.model';
import { Observable } from 'rxjs';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private api = inject(ApiService);

  getCategories(search?: string): Observable<ApiResponse<Category[]>> {
    let params = new HttpParams();
    if (search) {
      params = params.set('search', search);
    }
    return this.api.get<ApiResponse<Category[]>>('/categories', params);
  }

  createCategory(category: CreateCategoryDto): Observable<ApiResponse<Category>> {
    return this.api.post<ApiResponse<Category>>('/categories', category);
  }

  updateCategory(id: string, category: Partial<CreateCategoryDto>): Observable<ApiResponse<Category>> {
    return this.api.put<ApiResponse<Category>>(`/categories/${id}`, category);
  }

  deleteCategory(id: string): Observable<ApiResponse<null>> {
    return this.api.delete<ApiResponse<null>>(`/categories/${id}`);
  }
}
