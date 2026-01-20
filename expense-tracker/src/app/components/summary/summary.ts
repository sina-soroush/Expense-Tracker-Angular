import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Expense } from '../../models/expense.model';
import { LucideAngularModule, Utensils, Home, Car, Film, Lightbulb, Activity, ShoppingBag, BookOpen, Package } from 'lucide-angular';


@Component({
  selector: 'app-summary',
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './summary.html',
  styleUrl: './summary.css',
})
export class SummaryComponent implements OnChanges {
  @Input() expenses: Expense[] = [];
  
  totalAmount = 0;
  expenseCount = 0;
  categoryTotals: { category: string; amount: number; percentage: number }[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['expenses']) {
      this.calculateSummary();
    }
  }

  private calculateSummary(): void {
    this.expenseCount = this.expenses.length;
    this.totalAmount = this.expenses.reduce((sum, expense) => sum + expense.amount, 0);
    
    const categoryMap = new Map<string, number>();
    
    this.expenses.forEach(expense => {
      const current = categoryMap.get(expense.category) || 0;
      categoryMap.set(expense.category, current + expense.amount);
    });

    this.categoryTotals = Array.from(categoryMap.entries())
      .map(([category, amount]) => ({
        category,
        amount,
        percentage: this.totalAmount > 0 ? (amount / this.totalAmount) * 100 : 0
      }))
      .sort((a, b) => b.amount - a.amount);
  }

  getCategoryIcon(category: string): any {
    const icons: { [key: string]: any } = {
      'Food': Utensils,
      'Rent': Home,
      'Transport': Car,
      'Entertainment': Film,
      'Utilities': Lightbulb,
      'Healthcare': Activity,
      'Shopping': ShoppingBag,
      'Education': BookOpen,
      'Other': Package
    };
    return icons[category] || Package;
  }
}
