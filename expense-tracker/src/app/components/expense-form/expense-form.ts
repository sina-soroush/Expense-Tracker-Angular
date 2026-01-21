import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LucideAngularModule, Plus, Pencil } from 'lucide-angular';
import { Router, ActivatedRoute } from '@angular/router';
import { ExpenseService } from '../../services/expense.service';
import { EXPENSE_CATEGORIES } from '../../models/expense.model';


@Component({
  selector: 'app-expense-form',
  imports: [CommonModule, ReactiveFormsModule, LucideAngularModule],
  templateUrl: './expense-form.html',
  styleUrl: './expense-form.css',
})
export class ExpenseFormComponent implements OnInit {
  readonly PlusIcon = Plus;
  readonly PencilIcon = Pencil;
  
  expenseForm!: FormGroup;
  categories = EXPENSE_CATEGORIES;
  isEditMode = false;
  expenseId: string | null = null;
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private expenseService: ExpenseService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.expenseForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      amount: ['', [Validators.required, Validators.min(0.01)]],
      category: ['', Validators.required],
      date: ['', Validators.required]
    });

    this.expenseId = this.route.snapshot.paramMap.get('id');
    
    if (this.expenseId) {
      this.isEditMode = true;
      this.loadExpense(this.expenseId);
    } else {
      const today = new Date().toISOString().split('T')[0];
      this.expenseForm.patchValue({ date: today });
    }
  }

  loadExpense(id: string): void {
    const expense = this.expenseService.getExpenseById(id);
    
    if (expense) {
      const dateString = new Date(expense.date).toISOString().split('T')[0];
      
      this.expenseForm.patchValue({
        title: expense.title,
        amount: expense.amount,
        category: expense.category,
        date: dateString
      });
    } else {
      alert('Expense not found!');
      this.router.navigate(['/expenses']);
    }
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.expenseForm.invalid) {
      return;
    }

    const formValue = this.expenseForm.value;

    if (this.isEditMode && this.expenseId) {
      this.expenseService.updateExpense(this.expenseId, formValue);
    } else {
      this.expenseService.addExpense(formValue);
    }

    this.router.navigate(['/expenses']);
  }

  onCancel(): void {
    this.router.navigate(['/expenses']);
  }

  get f() {
    return this.expenseForm.controls;
  }

  hasError(fieldName: string, errorType: string): boolean {
    const field = this.expenseForm.get(fieldName);
    return !!(field && field.hasError(errorType) && (field.touched || this.submitted));
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.expenseForm.get(fieldName);
    return !!(field && field.invalid && (field.touched || this.submitted));
  }

  incrementAmount(): void {
    const currentAmount = this.expenseForm.get('amount')?.value || 0;
    this.expenseForm.patchValue({ amount: Number(currentAmount) + 1 });
  }

  decrementAmount(): void {
    const currentAmount = this.expenseForm.get('amount')?.value || 0;
    const newAmount = Math.max(0, Number(currentAmount) - 1);
    this.expenseForm.patchValue({ amount: newAmount });
  }
}
