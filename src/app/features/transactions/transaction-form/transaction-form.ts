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
import { Transaction, CreateTransactionDto } from '../models/transaction.model';
import { TransactionService } from '../services/transaction.service';
import { CategoryService } from '../../categories/services/category.service';
import { ToastService } from '../../../core/services/toast.service';

@Component({
  selector: 'app-transaction-form',
  standalone: true,
  imports: [CommonModule, FormsModule, Modal, Input, Button, Select],
  templateUrl: './transaction-form.html',
  styleUrl: './transaction-form.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TransactionForm implements OnChanges, OnInit {
  private transactionService = inject(TransactionService);
  private categoryService = inject(CategoryService);
  private toastService = inject(ToastService);

  isOpen = model<boolean>(false);
  transactionToEdit = input<Transaction | null>(null);
  saved = output<void>();

  typeOptions: SelectOption[] = [
    { value: 'expense', label: 'Expense' },
    { value: 'income', label: 'Income' },
  ];

  categoryOptions: SelectOption[] = [];

  formData: {
    amount: number | null;
    type: '' | 'expense' | 'income';
    category: string;
    date: string;
    description: string;
    isRecurring: boolean;
  } = {
    amount: null,
    type: '',
    category: '',
    date: new Date().toISOString().split('T')[0],
    description: '',
    isRecurring: false,
  };

  loading = signal(false);

  ngOnInit() {
    this.loadCategories();
  }

  ngOnChanges(changes: SimpleChanges) {
    if ('transactionToEdit' in changes) {
      const tx = this.transactionToEdit();
      if (tx) {
        this.formData = {
          amount: tx.amount || 0,
          type: tx.type || 'expense',
          category: typeof tx.category === 'string' ? tx.category : tx.category?._id || '',
          date: tx.date
            ? new Date(tx.date).toISOString().split('T')[0]
            : new Date().toISOString().split('T')[0],
          description: tx.description || '',
          isRecurring: !!tx.isRecurring,
        };
      } else {
        this.resetForm();
      }
    }
  }

  private resetForm() {
    this.formData = {
      amount: null,
      type: '',
      category: '',
      date: new Date().toISOString().split('T')[0],
      description: '',
      isRecurring: false,
    };
  }

  loadCategories() {
    this.categoryService.getCategories().subscribe({
      next: (res) => {
        const cats = res?.data || [];
        this.categoryOptions = cats.map((c) => ({ value: c._id, label: c.type }));
      },
      error: (err) => {
        console.error(err);
        this.toastService.error('Failed to load categories');
      },
    });
  }

  close() {
    this.isOpen.set(false);
  }

  save() {
    if (!this.formData.type) {
      this.toastService.error('Please select a transaction type');
      return;
    }
    if (!this.formData.amount || this.formData.amount <= 0) {
      this.toastService.error('Amount must be greater than 0');
      return;
    }
    if (!this.formData.date) {
      this.toastService.error('Please select a date');
      return;
    }
    const requiresCategory = this.formData.type !== 'income';
    if (requiresCategory && !this.formData.category) {
      this.toastService.error('Please select a category');
      return;
    }
    if (this.loading()) return;

    this.loading.set(true);
    const dto: CreateTransactionDto = {
      amount: this.formData.amount!,
      type: this.formData.type as 'expense' | 'income',
      date: new Date(this.formData.date).toISOString(),
      description: this.formData.description || undefined,
      isRecurring: this.formData.isRecurring,
      category: requiresCategory ? this.formData.category : undefined,
    };

    const tx = this.transactionToEdit();
    const request$ = tx
      ? this.transactionService.updateTransaction(tx._id, dto)
      : this.transactionService.createTransaction(dto);

    const successMsg = tx ? 'Transaction updated successfully' : 'Transaction created successfully';
    const errorMsg = tx ? 'Failed to update transaction' : 'Failed to create transaction';

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
        this.toastService.error(errorMsg);
      },
    });
  }
}
