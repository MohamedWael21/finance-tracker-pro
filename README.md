# Finance Tracker Pro

[![Angular](https://img.shields.io/badge/Angular-21-red?logo=angular)](https://angular.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-Express-green?logo=node.js)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-4EA94B?logo=mongodb)](https://www.mongodb.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript)](https://www.typescriptlang.org/)

Finance Tracker Pro is a full-stack personal finance management system built to help users track income and expenses, manage budgets, automate recurring transactions, receive budget alerts, and review financial performance through analytics dashboards and reports.

It is designed as a collaborative project with a separate Angular frontend and Node.js/Express backend, connected through authenticated REST APIs and cookie-based session handling.

## Demo

Project walkthrough and showcase:

<https://drive.google.com/drive/folders/1lNoDlLw0l7kRPs0HdGJPseBCWs7IcXhv?usp=sharing>

## Backend Repository

Backend repository:

<https://github.com/MarwaAshraf1812/finance-tracker-app>

The frontend consumes the backend REST API under `http://localhost:5000/api/v1` during development. The backend powers authentication, transactions, budgets, categories, recurring transactions, notifications, reports, payments, and profile operations.

## Features

- User registration, login, logout, password reset, and reset confirmation
- Cookie-based authenticated sessions with protected routes
- Transaction CRUD with income/expense types
- Transaction search, filtering, date range filtering, amount range filtering, sorting, and pagination
- Category CRUD with user-owned custom categories
- Budget creation, update, deletion, and budget overview
- Recurring transaction support with scheduled processing
- Notification center with unread count, mark-as-read, and delete actions
- Budget alert polling and toast notifications for new alerts
- Premium plan flow powered by Stripe payment intent creation
- Profile management with avatar upload, avatar removal, and password change
- Dashboard analytics with income/expense charts and category breakdowns
- Reports view with annual trend analysis and savings metrics
- Responsive sidebar, header, layouts, reusable UI primitives, and modal-driven workflows
- AI chatbot entry point for guided finance assistance

## Team Responsibilities & Collaboration

| 👤 Member                  | 🎯 Responsibility                                  | 📌 Details                                                                                                                                                                                                                                                                                                                                                                                                                       |
| -------------------------- | -------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Mahmoud&nbsp;Mostafa**   | Project Setup & Core Finance Features              | • Set up the Angular project folder structure <br>• Managed task assignment and development workflow coordination<br>• Implemented Categories feature UI and business flow<br>• Built Transactions feature with CRUD operations and filtering support<br>• Developed Budgets feature and finance workflow integration management across finance modules |
| **Marwa&nbsp;Ashraf**      | Core Frontend Infrastructure & Authentication Flow | • Configured environment setup and API integration structure<br>• Built thin API service abstraction layer<br>• Implemented authentication service using Angular Signals<br>• Developed auth guards and HTTP interceptor flow<br>• Configured feature-based routing structure<br>• Implemented login and registration frontend flows                                                                    |
| **Mohamed&nbsp;Wael**      | Shared UI System & Layout Architecture             | • Built reusable UI component system (Button, Input, Modal, Table, Toast, etc.)<br>• Developed responsive Navbar and Sidebar layouts<br>• Implemented main application layout structure<br>• Created reusable chart components and utility pipes<br>• Standardized loading, empty, and error UI states across the application                                                                                |
| **Abdulrahman&nbsp;Nagah** | Dashboard & Reporting Experience                   | • Developed dashboard UI and summary visualization flows<br>• Integrated analytics and reusable chart components<br>• Built reports feature interface and advanced filtering UI<br>• Connected dashboard data presentation with finance modules                                                                                                                                                                   |
| **Mohanad&nbsp;Tarek**     | Advanced Features & Premium Experience             | • Implemented notifications interface and unread notification flows<br>• Developed chatbot frontend experience and interaction flow<br>• Built payments and pricing UI flows<br>• Implemented subscription and premium feature gating interfaces<br>• Developed profile management frontend screens and interactions                                                                                         |### Collaboration model

- Frontend and backend are developed as separate apps with a shared API contract.
- Feature ownership is split by domain, but data models and endpoint contracts stay aligned.
- Reusable shared components and services reduce duplication in the Angular client.
- Validation lives close to the backend boundary so the UI and API can both enforce sane input rules.
- Admin, premium, reporting, and recurring flows cross multiple modules and were handled as joint system features rather than isolated screens.

## Technologies

| Technology                                         | Purpose in Project                                                                       | Team Usage / Responsibility                                                                        |
| -------------------------------------------------- | ---------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| Angular 21                                         | Frontend framework used for the SPA, routing, component composition, and feature modules | Used across the frontend to build the app shell, layouts, dashboards, forms, and feature pages     |
| TypeScript                                         | Strong typing for components, services, models, and API contracts                        | Used throughout the frontend and backend for safer data flow and clearer contracts                 |
| RxJS                                               | Reactive HTTP handling, subscriptions, and event-based flows                             | Used in services and feature components for API calls, polling, and form/workflow handling         |
| Tailwind CSS 4                                     | Utility-first styling and responsive layout control                                      | Used for the app’s visual system, spacing, responsiveness, and reusable design primitives          |
| Angular CDK / UI primitives                        | Low-level UI behavior and component composition patterns                                 | Supports reusable controls such as dialogs, tabs, inputs, selects, badges, and progress indicators |
| Lucide Angular                                     | Consistent icon system for navigation and action buttons                                 | Used across sidebar, header, charts, forms, and empty states                                       |
| Chart.js + ng2-charts                              | Financial data visualization for dashboard and reports                                   | Used for bar, pie, line, and horizontal bar charts in analytics views                              |
| Stripe JS                                          | Premium plan payment collection in the browser                                           | Used in the pricing screen to confirm card payments after backend intent creation                  |
| Node.js                                            | Runtime for the backend API                                                              | Hosts the Express server, cron job, services, and business logic                                   |
| Express                                            | HTTP API layer                                                                           | Used for routing, middleware, auth, admin, payments, reports, notifications, and CRUD endpoints    |
| MongoDB + Mongoose                                 | Database and object modeling                                                             | Stores users, transactions, budgets, categories, recurring transactions, and notifications         |
| JWT                                                | Authentication and session token strategy                                                | Used for cookie-based login sessions and refresh-token flows                                       |
| bcryptjs                                           | Password hashing and verification                                                        | Protects user credentials before persistence                                                       |
| Joi                                                | Request validation                                                                       | Validates auth, transactions, budgets, categories, recurring transactions, and admin payloads      |
| nodemailer                                         | Email delivery for reset-password flow                                                   | Used for password reset emails and recovery links                                                  |
| node-cron                                          | Scheduled background jobs                                                                | Used to process recurring transactions automatically every day                                     |
| Cloudinary + multer                                | Avatar upload pipeline                                                                   | Used in profile image upload and storage flow                                                      |
| Swagger / swagger-jsdoc                            | API documentation                                                                        | Exposes interactive backend docs at `/api-docs`                                                    |
| Helmet, cors, morgan, rate limiting, cookie-parser | Security, logging, and request handling middleware                                       | Used to harden the API and support authenticated browser requests                                  |
| Jest + Supertest                                   | Backend testing                                                                          | Used for automated API and service-level verification                                              |
| Prettier                                           | Code formatting                                                                          | Keeps frontend and backend code style consistent                                                   |

## Architecture Overview

The project follows a clean split between a feature-rich Angular client and a RESTful Express backend.

### Frontend

- The Angular app uses standalone components, lazy-loaded feature routes, shared layouts, and reusable UI primitives.
- Core services centralize API access, authentication state, dashboard data, payments, notifications, and user profile operations.
- Feature modules are organized by domain: auth, dashboard, transactions, budgets, categories, reports, notifications, payments, profile, and chatbot.
- Reactive forms and component-level validation are used where users enter or edit finance data.
- Charts and toast messaging are handled through shared components and services rather than duplicated per page.

### Backend

- The backend uses a layered structure of routes, controllers, services, models, middleware, validations, and utilities.
- Authentication is cookie-based and backed by JWT access and refresh tokens.
- Validation is handled centrally with Joi schemas before requests reach the controllers.
- Business logic is isolated in services for transactions, budgets, recurring processing, notifications, reports, payments, users, and admin operations.
- Recurring transactions are processed by a cron-driven scheduler that creates real transaction entries when their next run date arrives.

### Frontend-Backend Flow

- The Angular app sends credentialed requests with `withCredentials: true`.
- The backend reads the auth cookie, verifies the token, and returns user-specific resources.
- Reporting and dashboard pages derive their visual data from backend transaction and budget endpoints.
- Notifications are polled from the backend and surfaced in both the header dropdown and notification center.
- Premium access is guarded on the frontend and confirmed on the backend through Stripe and the user plan field.

## Project Structure

```plaintext
finance-tracker-pro/
├── src/
│   ├── app/
│   │   ├── core/                # API, auth, guards, dashboard, notifications, payment, toast, user services
│   │   ├── features/            # auth, dashboard, transactions, budgets, categories, reports, payments, profile, notifications, chatbot
│   │   ├── shared/              # layouts, reusable UI, charts, pipes, models
│   │   ├── types/               # app-wide TypeScript types
│   │   └── utils/               # cookie and HTTP error helpers
│   ├── environments/            # environment-specific API URLs
│   ├── styles.css               # global Tailwind entry
│   └── theme.css                # project theme tokens
├── public/
└── angular.json

finance-tracker-app/
└── src/
    ├── config/                  # DB, cloud, Swagger, upload configuration
    ├── controllers/             # request handlers
    ├── middlewares/             # auth, validation, rate limiting, error handling
    ├── models/                  # MongoDB schemas
    ├── routes/                  # REST endpoints
    ├── services/                # business logic
    ├── utils/                   # tokens, hashing, email, cron helpers, API features
    └── validation/              # Joi schemas
```

## Installation & Setup

### Prerequisites

- Node.js 18+ recommended
- npm
- MongoDB connection string
- Stripe test keys for premium checkout
- Email credentials for password reset flow
- Cloudinary credentials for avatar uploads

### Frontend Setup

```bash
cd finance-tracker-pro
npm install
npm start
```

Frontend runs with the Angular dev server and expects the backend at:

```ts
http://localhost:5000/api/v1
```

If you deploy the backend elsewhere, update `src/environments/environment.ts`.

### Backend Setup

```bash
cd finance-tracker-app
npm install
npm run dev
```

For production:

```bash
npm start
```

### Backend Environment Variables

The backend code expects, at minimum:

```env
PORT=5000
DB_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=7d
EMAIL_USER=your_email
EMAIL_PASS=your_email_password
CLOUD_NAME=your_cloudinary_name
CLOUD_API_KEY=your_cloudinary_key
API_SECRET=your_cloudinary_secret
STRIPE_SECRET_KEY=your_stripe_secret
STRIPE_PREMIUM_PRICE=999
NODE_ENV=development
```

### Stripe Webhook

To test premium payments locally, forward webhooks to:

```bash
npm run webhook
```

This maps Stripe events to `http://localhost:5000/api/v1/payment/webhook`.

## Screenshots / UI Showcase

Demo media folder:

<https://drive.google.com/drive/folders/1lNoDlLw0l7kRPs0HdGJPseBCWs7IcXhv?usp=sharing>

Place product screenshots here if you add them later:

- Dashboard
- Transactions
- Budgets
- Reports
- Notifications
- Profile
- Pricing / Premium checkout

## Future Improvements

- WebSocket-based live notifications instead of polling
- Exportable PDF/CSV reports from the Angular UI
- More advanced financial forecasting and trend insights
- Mobile-first refinements for dense dashboard workflows
- Better recurring transaction controls and schedule visibility
- AI-generated spending summaries and budget suggestions
- End-to-end test coverage for the most important finance flows

## Contribution & Development Workflow

- Keep feature work aligned to the existing domain folders
- Reuse shared UI primitives instead of creating one-off controls
- Keep API payloads and frontend models in sync
- Validate inputs on both the form layer and the backend schema layer
- Prefer small, reviewable changes that preserve the current architecture
- Use descriptive commits and branch names that map to the feature or bug being worked on

## License & Credits

This project is maintained by the Finance Tracker team named above in the README.

Special credit goes to everyone who contributed to this project.

---

Built as a collaborative finance management project for practical full-stack delivery, architecture clarity, and portfolio presentation.
