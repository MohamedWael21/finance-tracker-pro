import { Component, inject, signal, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BudgetService } from '../services/budget.service';
import { Budget } from '../models/budget.model';
import { ToastService } from '../../../core/services/toast.service';
import { NotificationApiService, Notification } from '../../../core/services/notification.service';
import { Button } from '../../../shared/components/ui/button/button';
import { Card } from '../../../shared/components/ui/card/card';
import { PageHeader } from '../../../shared/components/ui/page-header/page-header';
import { Modal } from '../../../shared/components/ui/modal/modal';
import { BudgetForm } from '../budget-form/budget-form';
import { ProgressBar } from '../../../shared/components/ui/progress-bar/progress-bar';
import { Category } from '../../categories/models/category.model';
import { LucidePlus, LucideAlertCircle, LucideBell, provideLucideIcons } from '@lucide/angular';

@Component({
  selector: 'app-budget-list',
  standalone: true,
  imports: [
    CommonModule,
    Button,
    Card,
    PageHeader,
    Modal,
    BudgetForm,
    ProgressBar,
    LucidePlus,
    LucideAlertCircle,
  ],
  providers: [provideLucideIcons(LucidePlus, LucideAlertCircle, LucideBell)],
  templateUrl: './budget-list.html',
  styleUrl: './budget-list.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BudgetList implements OnInit {
  private budgetService = inject(BudgetService);
  private toastService = inject(ToastService);
  private notificationService = inject(NotificationApiService);

  budgets = signal<Budget[]>([]);
  loading = signal(false);
  deleteLoading = signal(false);

  isModalOpen = signal(false);
  selectedBudget = signal<Budget | null>(null);
  deleteModalOpen = signal(false);
  selectedBudgetToDelete = signal<Budget | null>(null);

  ngOnInit() {
    this.loadBudgets();
    this.checkBudgetNotifications();
  }

  loadBudgets() {
    this.loading.set(true);
    this.budgetService.getBudgets().subscribe({
      next: (res) => {
        const data = (res?.data || []).map((b) => ({ ...b, spent: b.spent ?? 0 }));
        this.budgets.set(data);
        this.loading.set(false);
      },
      error: (err) => {
        console.error(err);
        this.toastService.error('Failed to load budgets');
        this.loading.set(false);
      },
    });
  }

  checkBudgetNotifications() {
    this.notificationService.getAll().subscribe({
      next: (res) => {
        const notifications = res?.data || [];
        const budgetAlerts = notifications.filter((n) => n.title === 'budget_alert' && !n.isRead);
        if (budgetAlerts.length > 0) {
          this.toastService.info(
            `You have ${budgetAlerts.length} budget alert(s). Check your budgets.`,
          );
        }
      },
      error: (err) => console.error('Failed to load notifications', err),
    });
  }

  openAddModal() {
    this.selectedBudget.set(null);
    this.isModalOpen.set(true);
  }

  openEditModal(budget: Budget) {
    this.selectedBudget.set(budget);
    this.isModalOpen.set(true);
  }

  openDeleteModal(budget: Budget) {
    this.selectedBudgetToDelete.set(budget);
    this.deleteModalOpen.set(true);
  }

  closeDeleteModal() {
    this.selectedBudgetToDelete.set(null);
    this.deleteModalOpen.set(false);
  }

  onSaved() {
    this.loadBudgets();
  }

  deleteBudget(id: string) {
    if (this.deleteLoading()) return;
    this.deleteLoading.set(true);
    this.budgetService.deleteBudget(id).subscribe({
      next: () => {
        this.deleteLoading.set(false);
        this.toastService.success('Budget deleted successfully');
        this.budgets.update((bs) => bs.filter((b) => b._id !== id));
        this.closeDeleteModal();
      },
      error: (err) => {
        console.error(err);
        this.deleteLoading.set(false);
        this.toastService.error('Failed to delete budget');
      },
    });
  }

  getCategoryName(budget: Budget): string {
    if (!budget.category) return 'Uncategorized';
    if (typeof budget.category === 'string') return budget.category;
    return (budget.category as Category).type || 'Uncategorized';
  }

  getCategoryColor(budget: Budget): string {
    if (!budget.category || typeof budget.category === 'string') return '#3b82f6';
    return (budget.category as Category).color || '#3b82f6';
  }

  getRemaining(budget: Budget): number {
    return Math.max(0, budget.amount - (budget.spent || 0));
  }

  getPercentage(budget: Budget): number {
    if (budget.amount === 0) return 0;
    return Math.min(100, Math.round(((budget.spent || 0) / budget.amount) * 100));
  }

  getMonthName(month: number): string {
    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    return months[month - 1] || '';
  }
}
