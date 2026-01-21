# 💰 Expense Tracker - Angular Application

A modern, feature-rich expense tracking application built with Angular, designed as a learning project for junior-level developers to master Angular fundamentals.

![Angular Version](https://img.shields.io/badge/Angular-19-red)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue)
![License](https://img.shields.io/badge/License-MIT-green)

## 📋 Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Application Overview](#application-overview)
- [What I Learned](#what-i-learned)
- [Future Enhancements](#future-enhancements)

## ✨ Features

### Core Functionality
- ➕ **Add Expenses**: Create new expense entries with title, amount, category, and date
- ✏️ **Edit Expenses**: Update existing expense information
- 🗑️ **Delete Expenses**: Remove unwanted expenses with confirmation
- 📊 **View Summary**: See total spending and expense count
- 🏷️ **Category Breakdown**: Visual representation of spending by category

### Advanced Features
- 🔍 **Filter by Category**: View expenses from specific categories
- 📅 **Filter by Month**: See expenses from a particular month
- 💾 **LocalStorage Persistence**: Data persists across browser sessions
- 📱 **Responsive Design**: Works seamlessly on desktop and mobile devices
- ✅ **Form Validation**: Required fields and positive amount validation
- 🎨 **Modern UI**: Glassmorphism design with animated gradients and Lucide icons

## 🛠️ Technologies Used

### Core Technologies
- **Angular 19** - Frontend framework with standalone components
- **TypeScript 5.x** - Type-safe development
- **RxJS** - Reactive programming and state management
- **Angular Router** - Client-side routing
- **Reactive Forms** - Form handling and validation
- **Lucide Angular** - Modern SVG icon library

### Development Tools
- **Angular CLI** - Project scaffolding and build tools
- **localStorage API** - Client-side data persistence
- **CSS3** - Glassmorphism effects, backdrop-filter, animated gradients

## 📁 Project Structure

```
expense-tracker/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── expense-list/         # Main list view with filters
│   │   │   │   ├── expense-list.ts
│   │   │   │   ├── expense-list.html
│   │   │   │   └── expense-list.css
│   │   │   ├── expense-item/         # Individual expense card
│   │   │   │   ├── expense-item.ts
│   │   │   │   ├── expense-item.html
│   │   │   │   └── expense-item.css
│   │   │   ├── expense-form/         # Add/Edit form with validation
│   │   │   │   ├── expense-form.ts
│   │   │   │   ├── expense-form.html
│   │   │   │   └── expense-form.css
│   │   │   └── summary/              # Spending summary widget
│   │   │       ├── summary.ts
│   │   │       ├── summary.html
│   │   │       └── summary.css
│   │   ├── models/
│   │   │   └── expense.model.ts      # Expense interface & categories
│   │   ├── services/
│   │   │   └── expense.service.ts    # Centralized data management
│   │   ├── app.routes.ts             # Application routes
│   │   ├── app.ts                    # Root component
│   │   └── app.html                  # Root template
│   └── styles.css                    # Global styles
├── angular.json                      # Angular configuration
├── package.json                      # Dependencies
└── README.md                         # This file
```

## 🚀 Getting Started

### Prerequisites
- **Node.js** (v18 or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js)
- No need to install Angular CLI globally - the project uses local dependencies

### Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/sina-soroush/Expense-Tracke-Angular.git
   cd Expense-Tracke-Angular/expense-tracker
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   
   **Option 1: Using npm (recommended)**
   ```bash
   npm start
   ```

   **Option 2: If you encounter issues with Conda or other tools intercepting the `ng` command**
   ```bash
   node ./node_modules/@angular/cli/bin/ng.js serve
   ```

   **Option 3: Using npx**
   ```bash
   npx ng serve
   ```

4. **Open your browser**
   
   The app will automatically open, or navigate to: **http://localhost:4200/**

   You should see:
   ```
   ✓ Application bundle generation complete.
   ✓ Local:   http://localhost:4200/
   ```

### Troubleshooting

**Problem:** `ng: command not found` or Conda intercepting the command
- **Solution:** Use Option 2 or Option 3 from step 3 above

**Problem:** Port 4200 is already in use
- **Solution:** Run with a different port:
  ```bash
  npm start -- --port 4300
  ```

**Problem:** Node.js version warning
- **Note:** Odd-numbered Node.js versions (like v25) are for testing. The app works fine, but consider using LTS versions (v18, v20, v22) for production.

### Building for Production

```bash
npm run build
```

Or for production configuration:
```bash
ng build --configuration production
```

The build artifacts will be stored in the `dist/` directory.

### Available Commands

| Command | Description |
|---------|-------------|
| `npm start` | Start development server on http://localhost:4200 |
| `npm run build` | Build the project |
| `npm run watch` | Build in watch mode for development |
| `npm test` | Run unit tests |

## 📱 Application Overview

### Main Views

#### 1. Expense List (`/expenses`)
- Displays all expenses in chronological order (newest first)
- Filters for category and month selection
- Summary card showing total spent
- Category breakdown with visual bars
- Empty state message when no expenses exist

#### 2. Add Expense (`/add`)
- Form to create new expenses
- Fields: Title, Amount, Category, Date
- Real-time validation with error messages
- Default date set to today

#### 3. Edit Expense (`/edit/:id`)
- Pre-populated form with existing expense data
- Same validation as add form
- Redirects to list view after update

### Key Components

#### ExpenseService
The heart of the application, managing all expense-related operations:
- CRUD operations (Create, Read, Update, Delete)
- State management using BehaviorSubject
- localStorage persistence
- Filtering by category and month
- Total calculations

```typescript
// Example usage
constructor(private expenseService: ExpenseService) {}

ngOnInit() {
  this.expenseService.getExpenses().subscribe(expenses => {
    this.expenses = expenses;
  });
}
```

#### Reactive Forms
Form validation demonstrating Angular best practices:
```typescript
this.expenseForm = this.fb.group({
  title: ['', [Validators.required, Validators.minLength(3)]],
  amount: ['', [Validators.required, Validators.min(0.01)]],
  category: ['', Validators.required],
  date: ['', Validators.required]
});
```

## 🎓 What I Learned

### Angular Fundamentals
✅ **Component Architecture**
- Creating standalone components
- Component communication with @Input and @Output
- Component lifecycle hooks (OnInit, OnDestroy, OnChanges)

✅ **Services & Dependency Injection**
- Creating injectable services
- Singleton pattern with `providedIn: 'root'`
- Service consumption in components

✅ **Reactive Programming**
- Working with Observables and BehaviorSubject
- Subscription management and memory leak prevention
- Reactive state management patterns

✅ **Routing**
- Setting up route configuration
- Route parameters for dynamic routes
- Programmatic navigation
- Route guards (ready to implement)

✅ **Forms**
- Reactive Forms setup and validation
- Custom validators
- Form state management
- Error handling and display

✅ **Angular Pipes**
- Using built-in pipes (currency, date, number)
- Data transformation in templates

### Best Practices Implemented
✅ Clean separation of concerns (Components, Services, Models)
✅ Type safety with TypeScript interfaces
✅ Proper subscription management
✅ Component reusability
✅ Semantic HTML and accessibility considerations
✅ Responsive design principles
✅ Clear code documentation with comments

### Development Skills
✅ Project structure organization
✅ Git workflow
✅ Problem-solving and debugging
✅ Reading Angular documentation
✅ CSS styling and layout techniques

## 🔮 Future Enhancements

### Planned Features
- [ ] **User Authentication**: Login/signup with user-specific data
- [ ] **Backend Integration**: REST API with Node.js/Express
- [ ] **Database**: PostgreSQL or MongoDB for data persistence
- [ ] **Charts & Visualizations**: Chart.js or ng2-charts for visual analytics
- [ ] **Export Functionality**: Export expenses to CSV/PDF
- [ ] **Budget Tracking**: Set monthly budgets per category
- [ ] **Recurring Expenses**: Support for monthly bills
- [ ] **Receipt Upload**: Attach receipt images to expenses
- [ ] **Multi-currency Support**: Track expenses in different currencies
- [ ] **Dark Mode**: Toggle between light and dark themes
- [ ] **Search**: Full-text search across expenses
- [ ] **Tags**: Custom tags for better organization
- [ ] **Reports**: Monthly/yearly spending reports

### Technical Improvements
- [ ] Unit tests with Jasmine/Karma
- [ ] E2E tests with Cypress
- [ ] State management with NgRx (for scaling)
- [ ] PWA capabilities for offline use
- [ ] Internationalization (i18n)
- [ ] Performance optimization
- [ ] Accessibility audit and improvements

## 📝 Development Notes

### Component Design Decisions

**ExpenseListComponent**: Acts as a smart container component that:
- Manages data fetching and state
- Handles filtering logic
- Passes data to child components

**ExpenseItemComponent**: A presentational component that:
- Displays expense data
- Emits events for parent handling
- No direct service dependencies

**ExpenseFormComponent**: Handles both add and edit modes:
- Checks route params to determine mode
- Reuses form logic for both operations
- Implements comprehensive validation

### Data Flow
```
Service (Single Source of Truth)
    ↓
BehaviorSubject (Observable State)
    ↓
Component Subscription
    ↓
Template Rendering
```

### LocalStorage Strategy
- Key: `expense-tracker-expenses`
- Data format: JSON array of expense objects
- Automatic sync on every CRUD operation
- Date objects serialized as ISO strings

## 🤝 Contributing

This is a learning project, but contributions are welcome! Please feel free to:
- Report bugs
- Suggest new features
- Submit pull requests
- Improve documentation

## 📄 License

This project is licensed under the MIT License - feel free to use it for learning and personal projects.

## 👨‍💻 Author

**Sina Soroush**

Built as a learning project to master Angular fundamentals and modern web development practices.

- GitHub: [@sina-soroush](https://github.com/sina-soroush)
- Project Repository: [Expense-Tracke-Angular](https://github.com/sina-soroush/Expense-Tracke-Angular)

---

## 📚 Resources Used

- [Angular Official Documentation](https://angular.dev)
- [Angular CLI Documentation](https://angular.dev/tools/cli)
- [RxJS Documentation](https://rxjs.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [MDN Web Docs](https://developer.mozilla.org)

---

**Happy Coding! 🚀**

*This project demonstrates real-world Angular development practices while maintaining clean, readable code suitable for junior developers.*
