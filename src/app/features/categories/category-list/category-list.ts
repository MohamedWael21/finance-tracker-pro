import {
  Component,
  inject,
  signal,
  OnInit,
  computed,
  ChangeDetectionStrategy,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryService } from '../services/category.service';
import { Category } from '../models/category.model';
import { ToastService } from '../../../core/services/toast.service';
import { TransactionService } from '../../transactions/services/transaction.service';
import { Button } from '../../../shared/components/ui/button/button';
import { Card } from '../../../shared/components/ui/card/card';
import { PageHeader } from '../../../shared/components/ui/page-header/page-header';
import { CategoryForm } from '../category-form/category-form';
import { Modal } from '../../../shared/components/ui/modal/modal';
import {
  LucideDynamicIcon,
  LucidePlus,
  LucidePencil,
  LucideTrash2,
  provideLucideIcons,
  LucideUtensils,
  LucideCar,
  LucideShoppingBag,
  LucideFilm,
  LucideHome,
} from '@lucide/angular';

@Component({
  selector: 'app-category-list',
  standalone: true,
  imports: [
    CommonModule,
    Button,
    Card,
    PageHeader,
    Modal,
    CategoryForm,
    LucideDynamicIcon,
    LucidePlus,
    LucidePencil,
    LucideTrash2,
  ],
  providers: [
    provideLucideIcons(LucideUtensils, LucideCar, LucideShoppingBag, LucideFilm, LucideHome),
  ],
  templateUrl: './category-list.html',
  styleUrl: './category-list.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoryList implements OnInit {
  private categoryService = inject(CategoryService);
  private toastService = inject(ToastService);
  private transactionService = inject(TransactionService);

  categories = signal<Category[]>([]);
  loading = signal(false);
  transactions = signal<any[]>([]);

  categoryStats = computed(() => {
    const cats = this.categories();
    const txs = this.transactions();
    return cats.map((cat) => {
      const catTxs = txs.filter((tx) => {
        const txCatId = typeof tx.category === 'string' ? tx.category : tx.category?._id;
        return txCatId === cat._id;
      });
      const totalSpent = catTxs
        .filter((tx) => tx.type === 'expense')
        .reduce((sum, tx) => sum + tx.amount, 0);
      return {
        ...cat,
        totalSpent,
        count: catTxs.length,
      };
    });
  });

  isModalOpen = signal(false);
  selectedCategory = signal<Category | null>(null);
  deleteModalOpen = signal(false);
  selectedCategoryToDelete = signal<Category | null>(null);
  deleteLoading = signal(false);

  ngOnInit() {
    this.loadCategories();
    this.loadTransactions();
  }

  loadCategories() {
    this.loading.set(true);
    this.categoryService.getCategories().subscribe({
      next: (res) => {
        this.categories.set(res?.data || []);
        this.loading.set(false);
      },
      error: (err) => {
        console.error(err);
        this.toastService.error('Failed to load categories');
        this.loading.set(false);
      },
    });
  }

  loadTransactions() {
    this.transactionService.getTransactions().subscribe({
      next: (res) => {
        this.transactions.set(res?.data || []);
      },
      error: (err) => console.error('Failed to load transactions for stats', err),
    });
  }

  openAddModal() {
    this.selectedCategory.set(null);
    this.isModalOpen.set(true);
  }

  openEditModal(category: Category) {
    this.selectedCategory.set(category);
    this.isModalOpen.set(true);
  }

  onSaved() {
    this.loadCategories();
  }

  openDeleteModal(category: Category) {
    this.selectedCategoryToDelete.set(category);
    this.deleteModalOpen.set(true);
  }

  closeDeleteModal() {
    this.selectedCategoryToDelete.set(null);
    this.deleteModalOpen.set(false);
  }

  deleteCategory(id: string) {
    if (this.deleteLoading()) return;
    this.deleteLoading.set(true);
    this.categoryService.deleteCategory(id).subscribe({
      next: () => {
        this.deleteLoading.set(false);
        this.toastService.success('Category deleted successfully');
        this.categories.update((cats) => cats.filter((c) => c._id !== id));
        this.closeDeleteModal();
      },
      error: (err) => {
        console.error(err);
        this.deleteLoading.set(false);
        this.toastService.error('Failed to delete category');
      },
    });
  }
}
