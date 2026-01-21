import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule, Wallet, Plus, Search } from 'lucide-angular';
import { Subscription } from 'rxjs';
import { ExpenseService } from '../../services/expense.service';
import { Expense, EXPENSE_CATEGORIES } from '../../models/expense.model';
import { ExpenseItemComponent } from '../expense-item/expense-item';
import { SummaryComponent } from '../summary/summary';

@Component({
  selector: 'app-expense-list',
  imports: [CommonModule, RouterModule, FormsModule, ExpenseItemComponent, SummaryComponent, LucideAngularModule],
  templateUrl: './expense-list.html',
  styleUrl: './expense-list.css',
})
export class ExpenseListComponent implements OnInit, OnDestroy {
  readonly WalletIcon = Wallet;
  readonly PlusIcon = Plus;
  readonly SearchIcon = Search;
  
  expenses: Expense[] = [];
  filteredExpenses: Expense[] = [];
  categories = EXPENSE_CATEGORIES;
  selectedCategory: string = 'all';
  selectedMonth: string = '';
  searchQuery: string = '';
  
  private subscription?: Subscription;

  constructor(private expenseService: ExpenseService) {}

  ngOnInit(): void {
    this.subscription = this.expenseService.getExpenses().subscribe(expenses => {
      this.expenses = expenses;
      this.applyFilters();
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  onSearchChange(): void {
    this.applyFilters();
  }

  applyFilters(): void {
    let filtered = [...this.expenses];

    if (this.selectedCategory && this.selectedCategory !== 'all') {
      filtered = filtered.filter(expense => expense.category === this.selectedCategory);
    }

    if (this.searchQuery) {
      const query = this.searchQuery.toLowerCase();
      filtered = filtered.filter(expense => 
        expense.title.toLowerCase().includes(query) ||
        expense.category.toLowerCase().includes(query)
      );
    }

    if (this.selectedMonth) {
      filtered = filtered.filter(expense => {
        const expenseDate = new Date(expense.date);
        const expenseYearMonth = `${expenseDate.getFullYear()}-${String(expenseDate.getMonth() + 1).padStart(2, '0')}`;
        return expenseYearMonth === this.selectedMonth;
      });
    }

    this.filteredExpenses = filtered;
  }

  onCategoryChange(): void {
    this.applyFilters();
  }

  onMonthChange(): void {
    this.applyFilters();
  }

  clearFilters(): void {
    this.selectedCategory = 'all';
    this.selectedMonth = '';
    this.applyFilters();
  }

  onDeleteExpense(id: string): void {
    if (confirm('Are you sure you want to delete this expense?')) {
      this.expenseService.deleteExpense(id);
    }
  }

  trackByExpenseId(index: number, expense: Expense): string {
    return expense.id;
  }
}
