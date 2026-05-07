import { Component, signal, inject, computed, OnInit, DestroyRef } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Subject, forkJoin, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, catchError } from 'rxjs/operators';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Button } from '../../ui/button/button';
import { LucideSearch, LucideBell, LucideCrown, LucideMenu, LucideX } from '@lucide/angular';
import { AuthService } from '../../../../core/auth/auth.service';
import {
  Notification,
  NotificationApiService,
} from '../../../../core/services/notification.service';
import { SidebarService } from '../../../../core/services/sidebar.service';
import { TimeAgoPipe } from '../../../pipes/time-ago';
import { TransactionService } from '../../../../features/transactions/services/transaction.service';
import { CategoryService } from '../../../../features/categories/services/category.service';

const MAX_NUM_NOTIFICATIONS = 5;
@Component({
  selector: 'app-header',
  imports: [RouterLink, Button, LucideSearch, LucideBell, LucideCrown, LucideMenu, TimeAgoPipe, FormsModule, LucideX],
  templateUrl: './header.html',
})
export class header implements OnInit {
  authService = inject(AuthService);
  notificationService = inject(NotificationApiService);
  sidebarService = inject(SidebarService);
  router = inject(Router);
  destroyRef = inject(DestroyRef);
  
  transactionService = inject(TransactionService);
  categoryService = inject(CategoryService);

  searchQuery = signal('');
  private searchSubject = new Subject<string>();

  searchResults = signal<{
    transactions: any[];
    categories: any[];
  } | null>(null);

  isSearching = signal(false);
  showSearchResults = signal(false);

  hasResults = computed(() => {
    const results = this.searchResults();
    if (!results) return false;
    return results.transactions.length > 0 || results.categories.length > 0;
  });

  notifications = computed(() => this.notificationService.notifications().slice(0, 5));
  unreadCount = this.notificationService.unreadCount;

  ngOnInit(): void {
    this.setupSearch();
  }

  setupSearch() {
    this.searchSubject.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((query) => {
        if (!query.trim()) {
           this.searchResults.set(null);
           this.showSearchResults.set(false);
           return of(null);
        }
        this.isSearching.set(true);
        this.showSearchResults.set(true);
        
        return forkJoin({
          transactions: this.transactionService.getTransactions({ search: query, limit: 5 }).pipe(catchError(() => of({ data: [] }))),
          categories: this.categoryService.getCategories(query).pipe(catchError(() => of({ data: [] }))),
        });
      }),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe((results) => {
      this.isSearching.set(false);
      if (results) {
        this.searchResults.set({
           transactions: results.transactions.data || [],
           categories: results.categories.data || []
        });
      }
    });
  }

  showNotifications = signal(false);
  showUserMenu = signal(false);

  isPremium = computed(() => {
    return this.authService.plan() === 'premium';
  });

  avatar = computed(() => {
    return this.authService.currentUser()?.avatar?.secure_url;
  });

  markAllAsRead() {
    this.notifications()?.forEach((notification) => {
      if (!notification.isRead) {
         this.notificationService.markAsRead(notification._id).subscribe();
      }
    });
  }

  markAsRead(id: string) {
    this.notificationService.markAsRead(id).subscribe();
  }

  toggleNotifications() {
    this.showNotifications.update((v) => !v);
    if (this.showNotifications()) {
      this.showUserMenu.set(false);
    }
  }

  toggleUserMenu() {
    this.showUserMenu.update((v) => !v);
    if (this.showUserMenu()) {
      this.showNotifications.set(false);
    }
  }

  handleLogout() {
    this.authService.logout();
  }

  onSearchInput(query: string) {
    this.searchQuery.set(query);
    this.searchSubject.next(query);
  }

  onSearchFocus() {
    if (this.searchQuery().trim()) {
       this.showSearchResults.set(true);
    }
  }

  onSearchBlur() {
    setTimeout(() => {
      this.showSearchResults.set(false);
    }, 200);
  }

  onSearch(event?: Event) {
    if (event) {
      event.preventDefault();
    }
    const query = this.searchQuery().trim();
    if (query) {
      this.router.navigate(['/transactions'], { queryParams: { search: query } });
      this.showSearchResults.set(false);
    }
  }

  navigateTo(path: string, id?: string) {
    this.showSearchResults.set(false);
    this.clearSearch();
    this.router.navigate([path]);
  }

  clearSearch() {
    this.searchQuery.set('');
    this.searchSubject.next('');
    this.showSearchResults.set(false);
  }
}
