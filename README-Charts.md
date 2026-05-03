# UI Component Library - Charts

This project uses a custom set of premium, reusable chart components built on top of **Chart.js** and **ng2-charts**. All charts are automatically wrapped in a `Card` component for high-quality dashboard integration.

## Table of Contents
- [General Principles](#general-principles)
- [Horizontal Bar Chart](#horizontal-bar-chart)
- [Grouped Bar Chart](#grouped-bar-chart)
- [Multi-Line Chart](#multi-line-chart)
- [Pie Chart](#pie-chart)

---

## General Principles

- **Signals Ready**: All components use Angular Signals for inputs and internal reactivity.
- **Premium Styling**: Pre-configured with "Inter" typography, smooth animations, and curated color palettes.
- **Responsive**: Charts automatically resize to fill their container.

---

## Horizontal Bar Chart
Ideal for category breakdowns (e.g., Spending by Category).

**Selector:** `app-horizontal-bar-chart`

### Inputs
| Name | Type | Description |
| :--- | :--- | :--- |
| `title` | `string` | The header text for the card. |
| `labels` | `string[]` | Categories for the Y-axis. |
| `data` | `number[]` | Values for each category. |
| `color` | `string` | Primary bar color (hex). |

### Usage
```html
<app-horizontal-bar-chart 
  [title]="'Spending Breakdown'"
  [labels]="['Food', 'Rent', 'Travel']"
  [data]="[450, 1200, 300]"
  [color]="'#7c3aed'"
/>
```

---

## Grouped Bar Chart
Used for comparing multiple datasets side-by-side (e.g., Income vs Expenses).

**Selector:** `app-bar-chart`

### Inputs
| Name | Type | Description |
| :--- | :--- | :--- |
| `title` | `string` | The card header. |
| `labels` | `string[]` | Labels for the X-axis. |
| `datasets` | `ChartSeries[]` | Array of `{ label, data, color }` objects. |

### Usage
```html
<app-bar-chart 
  [title]="'Income vs Expenses'"
  [labels]="['Jan', 'Feb', 'Mar']"
  [datasets]="[
    { label: 'Income', data: [4000, 4500, 4200], color: '#10b981' },
    { label: 'Expenses', data: [3200, 3800, 3500], color: '#ef4444' }
  ]"
/>
```

---

## Multi-Line Chart
Perfect for visualizing trends over time with smooth Bezier curves.

**Selector:** `app-line-chart`

### Inputs
| Name | Type | Description |
| :--- | :--- | :--- |
| `title` | `string` | The card header. |
| `labels` | `string[]` | Time periods for the X-axis. |
| `datasets` | `ChartSeries[]` | Array of `{ label, data, color }` objects. |

### Usage
```html
<app-line-chart 
  [title]="'Monthly Trends'"
  [labels]="['Oct', 'Nov', 'Dec']"
  [datasets]="[
    { label: 'Savings', data: [1200, 1500, 1700], color: '#7c3aed' }
  ]"
/>
```

---

## Pie Chart
A clean pie chart with color-coded labels drawn directly on the canvas.

**Selector:** `app-pie-chart`

### Inputs
| Name | Type | Description |
| :--- | :--- | :--- |
| `title` | `string` | Card header. |
| `labels` | `string[]` | Segment labels. |
| `data` | `number[]` | Values for each segment. |
| `colors` | `string[]` | Array of hex colors for segments. |

### Usage
```html
<app-pie-chart 
  [title]="'Spending Distribution'"
  [labels]="['Bills', 'Fun', 'Gifts']"
  [data]="[500, 150, 100]"
  [colors]="['#7c3aed', '#f59e0b', '#10b981']"
/>
```
