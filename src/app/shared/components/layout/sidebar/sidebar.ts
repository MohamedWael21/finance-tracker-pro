import { Component, computed, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import {
  LucideLayoutDashboard,
  LucideReceipt,
  LucideFolderOpen,
  LucideWallet,
  LucideBarChart3,
  LucideBell,
  LucideCreditCard,
  LucideCrown,
  LucideLock,
  LucideX,
} from '@lucide/angular';
import { AuthService } from '../../../../core/auth/auth.service';
import { SidebarService } from '../../../../core/services/sidebar.service';

interface NavItem {
  path: string;
  label: string;
  icon: string;
  premium: boolean;
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    LucideLayoutDashboard,
    LucideReceipt,
    LucideFolderOpen,
    LucideWallet,
    LucideBarChart3,
    LucideBell,
    LucideCreditCard,
    LucideCrown,
    LucideLock,
    LucideX,
  ],
  templateUrl: './sidebar.html',
})
export class Sidebar {
  authService = inject(AuthService);
  sidebarService = inject(SidebarService);

  isPremium = computed(() => {
    return this.authService.currentUser()?.plan === 'premium';
  });

  navItems: NavItem[] = [
    { path: '/', label: 'Dashboard', icon: 'LayoutDashboard', premium: false },
    { path: '/transactions', label: 'Transactions', icon: 'Receipt', premium: false },
    { path: '/categories', label: 'Categories', icon: 'FolderOpen', premium: false },
    { path: '/budgets', label: 'Budgets', icon: 'Wallet', premium: false },
    { path: '/reports', label: 'Reports', icon: 'BarChart3', premium: true },
    { path: '/pricing', label: 'Pricing', icon: 'CreditCard', premium: false },
    { path: '/notifications', label: 'Notifications', icon: 'Bell', premium: false },
  ];
}
