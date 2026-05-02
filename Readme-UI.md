# Finance Tracker UI Library — Documentation

This directory contains reusable, standalone UI components built with Angular Signals.

## Location

`src/app/shared/components/ui/`

---

## 1. Button — `<app-button>`

A flexible button with multiple styles and sizes.

- **Selector:** `app-button`
- **Inputs:**
  - `variant`: `'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'` (Default: `'primary'`)
  - `size`: `'sm' | 'md' | 'lg'` (Default: `'md'`)
- **Outputs:** `(click)`

```html
<app-button variant="primary" size="lg">Add Transaction</app-button>
```

---

## 2. Card — `<app-card>`

Structured container for content. Supports nested components for Header, Title, etc.

- **Selectors:** `app-card`, `app-card-header`, `app-card-title`, `app-card-content`, `app-card-footer`

```html
<app-card>
  <app-card-header>
    <app-card-title>Balance Summary</app-card-title>
  </app-card-header>
  <app-card-content>
    <h2 class="text-2xl font-bold">$12,450.00</h2>
  </app-card-content>
  <app-card-footer>
    <app-button variant="ghost" size="sm">View Details</app-button>
  </app-card-footer>
</app-card>
```

---

## 3. Modal — `<app-modal>`

A full-featured dialog with size control, 2-way binding, and backdrop blur.

- **Selector:** `app-modal`
- **Inputs:**
  - `[(isOpen)]`: Two-way model (boolean).
  - `title`: Header title text.
  - `size`: `'sm' | 'md' | 'lg'` (Default: `'sm'`)
- **Slots:** Named slot `[footer]` for action buttons.

```html
<app-modal title="Edit Budget" [(isOpen)]="showModal" size="md">
  <app-input label="Limit" type="number" />

  <div footer class="flex gap-2 w-full">
    <app-button variant="outline" class="flex-1" (click)="showModal = false">Cancel</app-button>
    <app-button class="flex-1" (click)="save()">Save</app-button>
  </div>
</app-modal>
```

---

## 4. Input — `<app-input>`

Standard text input with built-in labels and error states.

- **Selector:** `app-input`
- **Inputs:**
  - `[(value)]`: Two-way model (string).
  - `label`: Field label.
  - `placeholder`: Hint text.
  - `type`: HTML input type (`'text'`, `'password'`, `'email'`, etc.).
  - `error`: Error message (renders red and highlights border).

```html
<app-input
  label="Email Address"
  [(value)]="userEmail"
  placeholder="john@example.com"
  [error]="emailInvalid ? 'Invalid email' : ''"
/>
```

---

## 5. Select — `<app-select>`

Styled dropdown for selection lists.

- **Selector:** `app-select`
- **Inputs:**
  - `[(value)]`: Two-way model.
  - `options`: `SelectOption[]` — `{ label: string, value: any }`.
  - `label`: Field label.
  - `placeholder`: Optional "Choose..." text as first option.

```html
<app-select
  label="Category"
  [(value)]="selectedCat"
  [options]="[
    {label: 'Food & Dining', value: 'food'}, 
    {label: 'Bills', value: 'bills'}
  ]"
/>
```

---

## 6. Progress Bar — `<app-progress-bar>`

Visual tracking for budgets or goals.

- **Selector:** `app-progress-bar`
- **Auto-Logic:** Turns **Red** automatically if `value > max`.

```html
<app-progress-bar [value]="800" [max]="1000" [showLabel]="true" height="h-4" />
```

---

## 7. Tabs — `<app-tabs>`

Compound component that manages its own state and renders content based on selection.

- **Selectors:** `app-tabs`, `app-tab-panel`

```html
<app-tabs [tabs]="[{id: 'profile', label: 'Profile'}, {id: 'security', label: 'Security'}]">
  <app-tab-panel tabId="profile">
    <app-input label="Full Name" />
  </app-tab-panel>

  <app-tab-panel tabId="security">
    <app-input label="New Password" type="password" />
  </app-tab-panel>
</app-tabs>
```

---

## 8. Toggle (Switch) — `<app-toggle>`

For boolean settings.

- **Selector:** `app-toggle`
- **Inputs/Model:** `[(checked)]`, `label`, `disabled`.

```html
<app-toggle [(checked)]="twoFactor" label="Enable 2FA" />
```

---

## 9. Badge — `<app-badge>`

Small pills for statuses or tags.

- **Selector:** `app-badge`
- **Variants:** `default`, `secondary`, `destructive`, `outline`, `success`, `warning`.

```html
<app-badge variant="success">Income</app-badge>
```

---

## 10. Empty State — `<app-empty-state>`

Component for zero-data views.

- **Selector:** `app-empty-state`
- **Slots:** `[icon]` for the central icon, `[action]` for a button.

```html
<app-empty-state title="No Transactions" description="Your list is empty.">
  <lucide-plus-circle icon />
  <app-button action>Add Transaction</app-button>
</app-empty-state>
```

---

## 11. Page Header — `<app-page-header>`

Consistent header structure with title, subtitle, and action slot.

- **Selector:** `app-page-header`
- **Slot:** `[actions]` for right-side buttons.

```html
<app-page-header title="Dashboard" subtitle="Welcome back, John!">
  <app-button actions variant="primary">Add Income</app-button>
</app-page-header>
```

---

## 12. Skeleton — `<app-skeleton>`

Placeholder loading states for content.

- **Selector:** `app-skeleton`
- **Inputs:**
  - `isLoading` (required): Boolean to toggle shimmer vs content.
  - `type`: `'text' | 'avatar' | 'card' | 'thumbnail'` (Default: `'text'`)
  - `width`, `height`, `rounded`: Optional CSS strings.

```html
<app-skeleton [isLoading]="isDataLoading" type="card">
  <app-card>
    <app-card-content>Real data content here...</app-card-content>
  </app-card>
</app-skeleton>
```
