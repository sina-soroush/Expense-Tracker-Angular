import { Component, OnInit, OnDestroy, AfterViewInit, ElementRef, ViewChild, PLATFORM_ID, Inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule, Wallet, Plus, Search, Utensils, Home, Car, Film, Lightbulb, Activity, ShoppingBag, BookOpen, Package } from 'lucide-angular';
import { NgSelectModule } from '@ng-select/ng-select';
import { Subscription } from 'rxjs';
import { ExpenseService } from '../../services/expense.service';
import { Expense, EXPENSE_CATEGORIES, CategoryOption } from '../../models/expense.model';
import { ExpenseItemComponent } from '../expense-item/expense-item';
import { SummaryComponent } from '../summary/summary';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

@Component({
  selector: 'app-expense-list',
  imports: [CommonModule, RouterModule, FormsModule, ExpenseItemComponent, SummaryComponent, LucideAngularModule, NgSelectModule],
  templateUrl: './expense-list.html',
  styleUrl: './expense-list.css',
})
export class ExpenseListComponent implements OnInit, OnDestroy, AfterViewInit {
  readonly WalletIcon = Wallet;
  readonly PlusIcon = Plus;
  readonly SearchIcon = Search;
  
  @ViewChild('dateFilter') dateFilter!: ElementRef<HTMLInputElement>;
  
  expenses: Expense[] = [];
  filteredExpenses: Expense[] = [];
  categories = EXPENSE_CATEGORIES;
  selectedCategory: string = 'all';
  selectedDate: string = '';
  searchQuery: string = '';
  
  categoryOptions: CategoryOption[] = [
    { value: 'all', label: 'All Categories', icon: null, color: '' },
    { value: 'Food', label: 'Food', icon: Utensils, color: '#FF6B6B' },
    { value: 'Housing', label: 'Housing', icon: Home, color: '#4ECDC4' },
    { value: 'Transportation', label: 'Transportation', icon: Car, color: '#95E1D3' },
    { value: 'Entertainment', label: 'Entertainment', icon: Film, color: '#F38181' },
    { value: 'Utilities', label: 'Utilities', icon: Lightbulb, color: '#FDB44B' },
    { value: 'Healthcare', label: 'Healthcare', icon: Activity, color: '#6C5CE7' },
    { value: 'Shopping', label: 'Shopping', icon: ShoppingBag, color: '#A29BFE' },
    { value: 'Education', label: 'Education', icon: BookOpen, color: '#00B894' },
    { value: 'Other', label: 'Other', icon: Package, color: '#636E72' },
  ];
  
  private subscription?: Subscription;
  private flatpickrInstance: any = null;

  constructor(
    private expenseService: ExpenseService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    this.subscription = this.expenseService.getExpenses().subscribe(expenses => {
      this.expenses = expenses;
      this.applyFilters();
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
    if (this.flatpickrInstance && typeof this.flatpickrInstance.destroy === 'function') {
      this.flatpickrInstance.destroy();
    }
  }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId) && this.dateFilter?.nativeElement) {
      this.flatpickrInstance = flatpickr(this.dateFilter.nativeElement, {
        dateFormat: 'Y-m-d',
        onChange: (selectedDates, dateStr) => {
          this.selectedDate = dateStr;
          this.applyFilters();
        },
        disableMobile: true,
      });
    }
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

    if (this.selectedDate) {
      filtered = filtered.filter(expense => {
        const expenseDate = new Date(expense.date);
        const selectedDate = new Date(this.selectedDate);
        return expenseDate.toDateString() === selectedDate.toDateString();
      });
    }

    this.filteredExpenses = filtered;
  }

  onCategoryChange(): void {
    this.applyFilters();
  }

  onDateChange(): void {
    this.applyFilters();
  }

  clearFilters(): void {
    this.selectedCategory = 'all';
    this.selectedDate = '';
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
