import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import {
  LucideLayoutDashboard,
  LucideReceipt,
  LucideFolderOpen,
  LucideWallet,
  LucideBarChart3,
  LucideMessageSquare,
  LucideBell,
  LucideCreditCard,
  LucideCrown,
  LucideLock,
} from '@lucide/angular';

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
  ],
  templateUrl: './sidebar.html',
})
export class Sidebar {
  // placeholder
  userService = { isPremium: () => true };

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
