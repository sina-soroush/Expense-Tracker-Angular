import { Routes } from '@angular/router';
import { ExpenseListComponent } from './components/expense-list/expense-list';
import { ExpenseFormComponent } from './components/expense-form/expense-form';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/expenses',
    pathMatch: 'full'
  },
  {
    path: 'expenses',
    component: ExpenseListComponent,
    title: 'Expense Tracker - All Expenses'
  },
  {
    path: 'add',
    component: ExpenseFormComponent,
    title: 'Expense Tracker - Add Expense'
  },
  {
    path: 'edit/:id',
    component: ExpenseFormComponent,
    title: 'Expense Tracker - Edit Expense'
  },
  {
    path: '**',
    redirectTo: '/expenses'
  }
];
