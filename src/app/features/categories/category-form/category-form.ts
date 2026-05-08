import {
  Component,
  input,
  model,
  output,
  inject,
  OnChanges,
  SimpleChanges,
  ChangeDetectionStrategy,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Modal } from '../../../shared/components/ui/modal/modal';
import { Input } from '../../../shared/components/ui/input/input';
import { Button } from '../../../shared/components/ui/button/button';
import { Select, SelectOption } from '../../../shared/components/ui/select/select';
import { Category, CreateCategoryDto } from '../models/category.model';
import { CategoryService } from '../services/category.service';
import { ToastService } from '../../../core/services/toast.service';

const COLORS = [
  { value: '#3b82f6', label: 'Blue' },
  { value: '#22c55e', label: 'Green' },
  { value: '#ef4444', label: 'Red' },
  { value: '#f59e0b', label: 'Yellow' },
  { value: '#a855f7', label: 'Purple' },
];

const CATEGORY_TYPES: SelectOption[] = [
  { value: 'living expenses', label: 'Living Expenses' },
  { value: 'food', label: 'Food' },
  { value: 'transportation', label: 'Transportation' },
  { value: 'shopping', label: 'Shopping' },
  { value: 'entertainment', label: 'Entertainment' },
  { value: 'health', label: 'Health' },
  { value: 'education', label: 'Education' },
  { value: 'other', label: 'Other' },
];

const ICONS: SelectOption[] = [
  { value: 'wallet', label: 'No icon' },
  { value: 'utensils', label: 'Utensils' },
  { value: 'car', label: 'Car' },
  { value: 'shopping-bag', label: 'Shopping Bag' },
  { value: 'film', label: 'Film' },
  { value: 'home', label: 'Home' },
];

@Component({
  selector: 'app-category-form',
  standalone: true,
  imports: [CommonModule, FormsModule, Modal, Input, Button, Select],
  templateUrl: './category-form.html',
  styleUrl: './category-form.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoryForm implements OnChanges {
  private categoryService = inject(CategoryService);
  private toastService = inject(ToastService);

  isOpen = model<boolean>(false);
  categoryToEdit = input<Category | null>(null);
  saved = output<void>();

  colors = COLORS;
  icons = ICONS;
  categoryTypes = CATEGORY_TYPES;

  formData = {
    type: '',
    icon: 'wallet',
    color: '#3b82f6',
    customName: '',
  };

  loading = signal(false);

  // Only react when the category being edited actually changes
  ngOnChanges(changes: SimpleChanges) {
    if ('categoryToEdit' in changes) {
      const cat = this.categoryToEdit();
      if (cat) {
        const knownType = CATEGORY_TYPES.some((option) => option.value === cat.type);
        this.formData = {
          type: knownType ? cat.type : 'other',
          icon: cat.icon || 'wallet',
          color: cat.color || '#3b82f6',
          customName: knownType ? '' : cat.type || '',
        };
      } else {
        this.resetForm();
      }
    }
  }

  resetForm() {
    this.formData = { type: '', icon: 'utensils', color: '#3b82f6', customName: '' };
  }

  close() {
    this.isOpen.set(false);
  }

  save() {
    if (!this.formData.type.trim()) {
      this.toastService.error('Please select a category type');
      return;
    }
    if (this.formData.type === 'other' && !this.formData.customName.trim()) {
      this.toastService.error('Please enter a custom category name');
      return;
    }
    if (this.loading()) return; // prevent double-submit

    this.loading.set(true);
    const type =
      this.formData.type === 'other' ? this.formData.customName.trim() : this.formData.type;
    const dto: CreateCategoryDto = {
      type,
      icon: this.formData.icon,
      color: this.formData.color,
    };

    const cat = this.categoryToEdit();
    const request$ = cat
      ? this.categoryService.updateCategory(cat._id, dto)
      : this.categoryService.createCategory(dto);

    const successMsg = cat ? 'Category updated successfully' : 'Category created successfully';
    const errorMsg = cat ? 'Failed to update category' : 'Failed to create category';

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
