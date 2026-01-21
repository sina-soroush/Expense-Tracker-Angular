# 💰 Expense Tracker

A modern, feature-rich expense tracking application built with Angular, designed to help you manage your finances effortlessly. Track expenses, visualize spending patterns, and stay on top of your budget.

![Angular Version](https://img.shields.io/badge/Angular-21-red)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue)
![License](https://img.shields.io/badge/License-MIT-green)
![SSR](https://img.shields.io/badge/SSR-Enabled-green)

## ✨ Features

- ➕ **Add & Edit Expenses** - Create and update expense entries with ease
- 🏷️ **Category Management** - Organize expenses into customizable categories (Food, Transport, Entertainment, etc.)
- 📊 **Visual Spending Summary** - See total spending and category breakdown at a glance
- 📅 **Date & Month Filtering** - Filter expenses by specific months or date ranges
- 🔍 **Advanced Filtering** - Filter by category with beautiful dropdown selectors
- 💾 **Local Storage Persistence** - Your data is saved automatically in your browser
- 📱 **Fully Responsive** - Works seamlessly on desktop, tablet, and mobile devices
- ✅ **Form Validation** - Smart validation ensures data accuracy
- 🎨 **Modern Glassmorphism UI** - Beautiful interface with animated gradients and smooth transitions
- ⚡ **Server-Side Rendering** - Fast initial load times with Angular SSR

## 🔗 Preview

You can view the live version of this project here:

👉 **[Live Demo](https://expense-tracker-angular-sigma.vercel.app/)** _(coming soon)_

![Expense Tracker Screenshot](https://via.placeholder.com/800x400?text=Expense+Tracker+Screenshot)

## 🛠️ Built With

- **[Angular 21](https://angular.dev)** - Frontend framework with standalone components and SSR
- **[TypeScript 5.9](https://www.typescriptlang.org/)** - Type-safe development
- **[RxJS](https://rxjs.dev)** - Reactive programming and state management
- **[Angular Router](https://angular.dev/guide/routing)** - Client-side routing
- **[Reactive Forms](https://angular.dev/guide/forms)** - Form handling and validation
- **[Lucide Angular](https://lucide.dev/)** - Modern SVG icon library
- **[@ng-select](https://github.com/ng-select/ng-select)** - Advanced select component
- **[Flatpickr](https://flatpickr.js.org/)** - Lightweight date picker
- **[Express](https://expressjs.com/)** - Server for SSR deployment
- **LocalStorage API** - Client-side data persistence

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
- **npm** or **yarn**

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/sina-soroush/Expense-Tracker-Angular.git
   cd Expense-Tracker-Angular
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```
   
   Alternative methods:
   ```bash
   # Using npx
   npx ng serve
   
   # Or direct Angular CLI
   node ./node_modules/@angular/cli/bin/ng.js serve
   ```

4. **Open your browser**
   
   Navigate to **http://localhost:4200/**
   
   The app will hot-reload as you make changes.

### 📦 Available Scripts

| Command | Description |
|---------|-------------|
| `npm start` | Start development server on http://localhost:4200 |
| `npm run build` | Build the project for production |
| `npm run build:vercel` | Build for Vercel deployment |
| `npm run watch` | Build in watch mode for development |
| `npm test` | Run unit tests |
| `npm run serve:ssr:expense-tracker` | Run the SSR server locally |

## 🎨 Features in Detail

### Expense Management
- Create custom expenses with title, amount, category, and date
- Edit existing expenses with pre-populated forms
- Delete expenses with confirmation prompts
- Real-time form validation with helpful error messages

### Category System
- **Pre-defined Categories**: Food & Dining, Transportation, Entertainment, Shopping, Health & Medical, Bills & Utilities, Education, Travel, Personal Care, Other
- Color-coded category badges for easy identification
- Category-based filtering with beautiful dropdown UI

### Visual Analytics
- **Total Spending Summary** - See your total expenses at a glance
- **Category Breakdown** - Visual progress bars showing spending distribution
- **Expense Count** - Track the number of transactions
- **Monthly Overview** - Filter and view expenses by specific months

### Data Management
- **LocalStorage Persistence** - All data saved automatically in your browser
- **No Backend Required** - Complete privacy, data never leaves your device
- **Import/Export Ready** - Architecture supports future data export features

### User Experience
- **Responsive Design** - Optimized for all screen sizes
- **Glassmorphism UI** - Modern, translucent design with blur effects
- **Smooth Animations** - Delightful transitions and hover effects
- **Lucide Icons** - Crisp, scalable SVG icons throughout the app
- **Date Picker** - User-friendly calendar for selecting expense dates

## 🌐 Deployment

This application is configured for deployment on Vercel with SSR support.

### Deploy to Vercel

1. **Push your code to GitHub**
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push
   ```

2. **Deploy on Vercel**
   - Visit [vercel.com](https://vercel.com) and sign in
   - Click "Add New Project"
   - Import your GitHub repository
   - Vercel will auto-detect Angular settings
   - Click "Deploy"

3. **Configuration Files**
   - `.npmrc` - Handles peer dependency conflicts
   - `vercel.json` - Configures SSR routing

### Alternative Deployment Options

- **Netlify** - Static site hosting
- **Firebase Hosting** - Google Cloud integration
- **GitHub Pages** - Free static hosting
- **AWS Amplify** - Full-stack deployment

## 📱 Responsive Design

The application is fully responsive and works seamlessly on:

- 🖥️ **Desktop computers** - Full-featured experience with multi-column layout
- 📱 **Tablets** - Optimized touch-friendly interface
- 📱 **Mobile devices** - Compact, thumb-friendly design with easy navigation

## � Data Storage

All expense data is stored locally in your browser using **LocalStorage**. Your data never leaves your device, ensuring complete privacy and security.

- **Storage Key**: `expense-tracker-expenses`
- **Data Format**: JSON array of expense objects
- **Auto-sync**: Automatic saving on every add, edit, or delete operation
- **Privacy First**: No backend, no servers, 100% local

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. **Fork the project**
2. **Create your feature branch**
   ```bash
   git checkout -b feature/AmazingFeature
   ```
3. **Commit your changes**
   ```bash
   git commit -m 'Add some AmazingFeature'
   ```
4. **Push to the branch**
   ```bash
   git push origin feature/AmazingFeature
   ```
5. **Open a Pull Request**

## 📄 License

This project is licensed under the MIT License - feel free to use it for personal and commercial projects.

## 👤 Author

**Sina Soroush**

- GitHub: [@sina-soroush](https://github.com/sina-soroush)
- Project: [Expense-Tracker-Angular](https://github.com/sina-soroush/Expense-Tracker-Angular)

Building modern web applications with Angular, React, Node.js, and exploring cutting-edge technologies.

## 🙏 Acknowledgments

- Inspired by modern expense tracking applications
- Angular community for excellent documentation and support
- Glassmorphism design trends
- Open-source libraries that power this project

---

## 🔮 Future Enhancements

### Planned Features
- [ ] **User Authentication** - Multi-user support with secure login
- [ ] **Backend Integration** - REST API with Node.js/Express
- [ ] **Database** - PostgreSQL or MongoDB for cloud storage
- [ ] **Charts & Visualizations** - Interactive charts with Chart.js
- [ ] **Export Functionality** - Export expenses to CSV/PDF
- [ ] **Budget Tracking** - Set monthly budgets per category
- [ ] **Recurring Expenses** - Support for subscription tracking
- [ ] **Receipt Upload** - Attach receipt images to expenses
- [ ] **Multi-currency Support** - Track expenses in different currencies
- [ ] **Dark Mode** - Toggle between light and dark themes
- [ ] **Search & Filter** - Advanced search and filtering options
- [ ] **Analytics Dashboard** - Comprehensive spending insights

### Technical Improvements
- [ ] Unit tests with Jasmine/Karma or Vitest
- [ ] E2E tests with Cypress or Playwright
- [ ] State management with NgRx/Signals
- [ ] PWA capabilities for offline use
- [ ] Internationalization (i18n)
- [ ] Performance optimization
- [ ] Accessibility (WCAG 2.1) compliance

---

**Happy Tracking! 💰**

*Built with ❤️ using Angular 21 - Modern web development at its finest.*
