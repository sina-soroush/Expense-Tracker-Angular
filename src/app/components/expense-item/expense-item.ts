import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Expense } from '../../models/expense.model';
import { LucideAngularModule, Utensils, Home, Car, Film, Lightbulb, Activity, ShoppingBag, BookOpen, Package, Pencil, Trash2 } from 'lucide-angular';

@Component({
  selector: 'app-expense-item',
  imports: [CommonModule, RouterModule, LucideAngularModule],
  templateUrl: './expense-item.html',
  styleUrl: './expense-item.css',
})
export class ExpenseItemComponent {
  readonly PencilIcon = Pencil;
  readonly TrashIcon = Trash2;
  
  @Input() expense!: Expense;
  @Output() delete = new EventEmitter<string>();

  onDelete(): void {
    this.delete.emit(this.expense.id);
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
