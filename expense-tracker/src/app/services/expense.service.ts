import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Expense } from '../models/expense.model';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {
  private readonly STORAGE_KEY = 'expense-tracker-expenses';
  private expensesSubject = new BehaviorSubject<Expense[]>(this.loadFromStorage());
  public expenses$: Observable<Expense[]> = this.expensesSubject.asObservable();

  constructor() {
    if (this.expensesSubject.value.length === 0) {
      this.initializeMockData();
    }
  }

  getExpenses(): Observable<Expense[]> {
    return this.expenses$;
  }

  getExpensesSnapshot(): Expense[] {
    return this.expensesSubject.value;
  }

  getExpenseById(id: string): Expense | undefined {
    return this.expensesSubject.value.find(expense => expense.id === id);
  }

  addExpense(expense: Omit<Expense, 'id'>): void {
    const newExpense: Expense = {
      ...expense,
      id: this.generateId(),
      date: new Date(expense.date)
    };
    
    const updatedExpenses = [...this.expensesSubject.value, newExpense];
    this.updateExpenses(updatedExpenses);
  }

  updateExpense(id: string, updatedData: Partial<Expense>): void {
    const expenses = this.expensesSubject.value;
    const index = expenses.findIndex(expense => expense.id === id);
    
    if (index !== -1) {
      const updatedExpenses = [...expenses];
      updatedExpenses[index] = {
        ...updatedExpenses[index],
        ...updatedData,
        date: new Date(updatedData.date || updatedExpenses[index].date)
      };
      this.updateExpenses(updatedExpenses);
    }
  }

  deleteExpense(id: string): void {
    const updatedExpenses = this.expensesSubject.value.filter(
      expense => expense.id !== id
    );
    this.updateExpenses(updatedExpenses);
  }

  filterByCategory(category: string): Expense[] {
    if (!category || category === 'all') {
      return this.expensesSubject.value;
    }
    return this.expensesSubject.value.filter(
      expense => expense.category === category
    );
  }

  filterByMonth(yearMonth: string): Expense[] {
    if (!yearMonth) {
      return this.expensesSubject.value;
    }
    
    return this.expensesSubject.value.filter(expense => {
      const expenseDate = new Date(expense.date);
      const expenseYearMonth = `${expenseDate.getFullYear()}-${String(expenseDate.getMonth() + 1).padStart(2, '0')}`;
      return expenseYearMonth === yearMonth;
    });
  }

  getTotalAmount(expenses?: Expense[]): number {
    const expensesToCalculate = expenses || this.expensesSubject.value;
    return expensesToCalculate.reduce((total, expense) => total + expense.amount, 0);
  }

  getTotalByCategory(): Map<string, number> {
    const totals = new Map<string, number>();
    
    this.expensesSubject.value.forEach(expense => {
      const current = totals.get(expense.category) || 0;
      totals.set(expense.category, current + expense.amount);
    });
    
    return totals;
  }

  private updateExpenses(expenses: Expense[]): void {
    const sortedExpenses = expenses.sort((a, b) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    );
    
    this.expensesSubject.next(sortedExpenses);
    this.saveToStorage(sortedExpenses);
  }

  private generateId(): string {
    return `expense-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  private loadFromStorage(): Expense[] {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        return parsed.map((expense: any) => ({
          ...expense,
          date: new Date(expense.date)
        }));
      }
    } catch (error) {
      console.error('Error loading expenses from storage:', error);
    }
    return [];
  }

  private saveToStorage(expenses: Expense[]): void {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(expenses));
    } catch (error) {
      console.error('Error saving expenses to storage:', error);
    }
  }

  private initializeMockData(): void {
    const mockExpenses: Omit<Expense, 'id'>[] = [
      {
        title: 'Grocery Shopping',
        amount: 85.50,
        category: 'Food',
        date: new Date('2026-01-18')
      },
      {
        title: 'Monthly Rent',
        amount: 1200.00,
        category: 'Rent',
        date: new Date('2026-01-01')
      },
      {
        title: 'Gas Station',
        amount: 45.00,
        category: 'Transport',
        date: new Date('2026-01-15')
      },
      {
        title: 'Movie Tickets',
        amount: 28.00,
        category: 'Entertainment',
        date: new Date('2026-01-12')
      },
      {
        title: 'Electricity Bill',
        amount: 95.00,
        category: 'Utilities',
        date: new Date('2026-01-05')
      }
    ];

    mockExpenses.forEach(expense => this.addExpense(expense));
  }
}
