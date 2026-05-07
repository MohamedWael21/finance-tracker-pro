import {
  Component,
  computed,
  inject,
  signal,
  OnInit,
  ChangeDetectionStrategy,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TransactionService } from '../services/transaction.service';
import { Transaction } from '../models/transaction.model';
import { TransactionFilters } from '../models/transaction-filters.model';
import { ToastService } from '../../../core/services/toast.service';
import { Button } from '../../../shared/components/ui/button/button';
import { Card } from '../../../shared/components/ui/card/card';
import { PageHeader } from '../../../shared/components/ui/page-header/page-header';
import { Input } from '../../../shared/components/ui/input/input';
import { Select } from '../../../shared/components/ui/select/select';
import { Modal } from '../../../shared/components/ui/modal/modal';
import { TransactionForm } from '../transaction-form/transaction-form';
import { LucidePlus, LucidePencil, LucideTrash2, provideLucideIcons } from '@lucide/angular';

@Component({
  selector: 'app-transaction-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    Button,
    Card,
    PageHeader,
    Input,
    Select,
    Modal,
    TransactionForm,
    LucidePlus,
    LucidePencil,
    LucideTrash2,
  ],
  providers: [provideLucideIcons(LucidePlus, LucidePencil, LucideTrash2)],
  templateUrl: './transaction-list.html',
  styleUrl: './transaction-list.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TransactionList implements OnInit {
  private transactionService = inject(TransactionService);
  private toastService = inject(ToastService);

  transactions = signal<Transaction[]>([]);
  loading = signal(false);
  error = signal<string | null>(null);

  isModalOpen = signal(false);
  selectedTransaction = signal<Transaction | null>(null);
  deleteModalOpen = signal(false);
  selectedTransactionToDelete = signal<Transaction | null>(null);

  searchFilter = signal<string>('');
  typeFilter = signal<string>('');
  startDate = signal<string>('');
  endDate = signal<string>('');
  minAmount = signal<number | undefined>(undefined);
  maxAmount = signal<number | undefined>(undefined);
  currentPage = signal<number>(1);
  readonly limit = 10;
  total = signal<number>(0);
  totalPages = computed(() => Math.ceil(this.total() / this.limit));
  typeOptions = [
    { value: '', label: 'All Types' },
    { value: 'income', label: 'Income' },
    { value: 'expense', label: 'Expense' },
  ];

  ngOnInit() {
    this.loadTransactions();
  }

  private buildFilters(): TransactionFilters {
    const filters: TransactionFilters = {
      page: this.currentPage(),
      limit: this.limit,
    };
    const search = this.searchFilter();
    const type = this.typeFilter();
    const start = this.startDate();
    const end = this.endDate();
    const min = this.minAmount();
    const max = this.maxAmount();

    if (search) filters.search = search;
    if (type) filters.type = type as TransactionFilters['type'];
    if (start) filters.startDate = start;
    if (end) filters.endDate = end;
    if (min !== undefined) filters.minAmount = min;
    if (max !== undefined) filters.maxAmount = max;

    return filters;
  }

  loadTransactions() {
    this.loading.set(true);
    this.error.set(null);

    this.transactionService.getTransactions(this.buildFilters()).subscribe({
      next: (res) => {
        this.transactions.set(res?.data || []);
        this.total.set(res?.total || 0);
        this.loading.set(false);
      },
      error: (err) => {
        console.error(err);
        this.error.set('Failed to load transactions');
        this.transactions.set([]);
        this.loading.set(false);
      },
    });
  }

  onSearchChange(value: string | number | null | undefined) {
    this.searchFilter.set(String(value ?? ''));
    this.currentPage.set(1);
    this.loadTransactions();
  }

  onTypeChange(value: string | number | null | undefined) {
    this.typeFilter.set(String(value ?? ''));
    this.currentPage.set(1);
    this.loadTransactions();
  }

  onStartDateChange(value: string | number | null | undefined) {
    this.startDate.set(String(value ?? ''));
    this.currentPage.set(1);
    this.loadTransactions();
  }

  onEndDateChange(value: string | number | null | undefined) {
    this.endDate.set(String(value ?? ''));
    this.currentPage.set(1);
    this.loadTransactions();
  }

  onMinAmountChange(value: string | number | null | undefined) {
    this.minAmount.set(value != null && value !== '' ? Number(value) : undefined);
    this.currentPage.set(1);
    this.loadTransactions();
  }

  onMaxAmountChange(value: string | number | null | undefined) {
    this.maxAmount.set(value != null && value !== '' ? Number(value) : undefined);
    this.currentPage.set(1);
    this.loadTransactions();
  }

  openAddModal() {
    this.selectedTransaction.set(null);
    this.isModalOpen.set(true);
  }

  openEditModal(transaction: Transaction) {
    this.selectedTransaction.set(transaction);
    this.isModalOpen.set(true);
  }

  onSaved() {
    this.loadTransactions();
  }

  openDeleteModal(transaction: Transaction) {
    this.selectedTransactionToDelete.set(transaction);
    this.deleteModalOpen.set(true);
  }

  closeDeleteModal() {
    this.selectedTransactionToDelete.set(null);
    this.deleteModalOpen.set(false);
  }

  deleteTransaction(id: string) {
    this.transactionService.deleteTransaction(id).subscribe({
      next: () => {
        this.toastService.success('Transaction deleted successfully');
        this.transactions.update((txs) => txs.filter((t) => t._id !== id));
        this.closeDeleteModal();
      },
      error: (err) => {
        console.error(err);
        this.toastService.error('Failed to delete transaction');
      },
    });
  }

  getCategoryName(transaction: Transaction): string {
    if (!transaction.category) return 'Uncategorized';
    if (typeof transaction.category === 'string') return transaction.category;
    return transaction.category.type || 'Uncategorized';
  }

  getCategoryColor(transaction: Transaction): string {
    if (!transaction.category || typeof transaction.category === 'string') return '#6b7280';
    return transaction.category.color || '#6b7280';
  }

  changePage(newPage: number) {
    if (newPage < 1 || newPage > this.totalPages()) return;
    this.currentPage.set(newPage);
    this.loadTransactions();
  }
}
