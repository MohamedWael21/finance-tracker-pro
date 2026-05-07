import {
  Component,
  input,
  model,
  output,
  inject,
  OnChanges,
  SimpleChanges,
  OnInit,
  ChangeDetectionStrategy,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Modal } from '../../../shared/components/ui/modal/modal';
import { Input } from '../../../shared/components/ui/input/input';
import { Button } from '../../../shared/components/ui/button/button';
import { Select, SelectOption } from '../../../shared/components/ui/select/select';
import { Budget, CreateBudgetDto } from '../models/budget.model';
import { BudgetService } from '../services/budget.service';
import { CategoryService } from '../../categories/services/category.service';
import { ToastService } from '../../../core/services/toast.service';
import { Category } from '../../categories/models/category.model';

@Component({
  selector: 'app-budget-form',
  standalone: true,
  imports: [CommonModule, FormsModule, Modal, Input, Button, Select],
  templateUrl: './budget-form.html',
  styleUrl: './budget-form.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BudgetForm implements OnInit, OnChanges {
  private budgetService = inject(BudgetService);
  private categoryService = inject(CategoryService);
  private toastService = inject(ToastService);

  isOpen = model<boolean>(false);
  budgetToEdit = input<Budget | null>(null);
  saved = output<void>();

  categories: SelectOption[] = [];
  months: SelectOption[] = [
    { value: 1, label: 'January' },
    { value: 2, label: 'February' },
    { value: 3, label: 'March' },
    { value: 4, label: 'April' },
    { value: 5, label: 'May' },
    { value: 6, label: 'June' },
    { value: 7, label: 'July' },
    { value: 8, label: 'August' },
    { value: 9, label: 'September' },
    { value: 10, label: 'October' },
    { value: 11, label: 'November' },
    { value: 12, label: 'December' },
  ];

  formData: {
    amount: number | null;
    category: string;
    month: number;
    year: number;
  } = {
    amount: null,
    category: '',
    month: new Date().getMonth() + 1,
    year: new Date().getFullYear(),
  };

  loading = signal(false);

  ngOnInit() {
    this.loadCategories();
  }

  ngOnChanges(changes: SimpleChanges) {
    if ('budgetToEdit' in changes) {
      const budget = this.budgetToEdit();
      if (budget) {
        this.formData = {
          amount: budget.amount ?? null,
          category:
            typeof budget.category === 'string'
              ? budget.category
              : (budget.category as Category)?._id || '',
          month: budget.month || new Date().getMonth() + 1,
          year: budget.year || new Date().getFullYear(),
        };
      } else {
        this.resetForm();
      }
    }
  }

  private resetForm() {
    this.formData = {
      amount: null,
      category: '',
      month: new Date().getMonth() + 1,
      year: new Date().getFullYear(),
    };
  }

  loadCategories() {
    this.categoryService.getCategories().subscribe({
      next: (res) => {
        const data = res?.data || [];
        this.categories = data.map((c) => ({ value: c._id, label: c.type }));
      },
      error: (err) => console.error(err),
    });
  }

  close() {
    this.isOpen.set(false);
  }

  save() {
    const amount = Number(this.formData.amount);
    const month = Number(this.formData.month);
    const year = Number(this.formData.year);

    if (this.formData.amount === null || !Number.isFinite(amount) || amount <= 0) {
      this.toastService.error('Please provide a valid amount');
      return;
    }
    if (!this.formData.category) {
      this.toastService.error('Please select a budget category');
      return;
    }
    if (!Number.isFinite(month) || month < 1 || month > 12) {
      this.toastService.error('Please select a valid month');
      return;
    }
    if (!Number.isFinite(year) || year < 2000) {
      this.toastService.error('Please provide a valid year');
      return;
    }
    if (this.loading()) return;

    this.loading.set(true);
    const dto: CreateBudgetDto = {
      amount,
      category: this.formData.category,
      month,
      year,
    };

    const budget = this.budgetToEdit();
    const request$ = budget
      ? this.budgetService.updateBudget(budget._id, dto)
      : this.budgetService.createBudget(dto);

    const successMsg = budget ? 'Budget updated successfully' : 'Budget created successfully';
    const errorMsg = budget ? 'Failed to update budget' : 'Failed to create budget';

    request$.subscribe({
      next: () => {
        this.loading.set(false);
        this.toastService.success(successMsg);
        this.saved.emit();
        this.close();
      },
      error: (err) => {
        console.error(err);
        this.loading.set(false);
        const backendMessage = err?.error?.message || err?.message;
        if (backendMessage === 'A budget for this category and month already exists.') {
          this.toastService.error('A budget for this category already exists.');
          return;
        }
        this.toastService.error(errorMsg);
      },
    });
  }
}
