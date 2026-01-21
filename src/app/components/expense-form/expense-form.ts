import { Component, OnInit, AfterViewInit, OnDestroy, ElementRef, ViewChild, PLATFORM_ID, Inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LucideAngularModule, Plus, Pencil, Utensils, Home, Car, Film, Lightbulb, Activity, ShoppingBag, BookOpen, Package } from 'lucide-angular';
import { Router, ActivatedRoute } from '@angular/router';
import { ExpenseService } from '../../services/expense.service';
import { EXPENSE_CATEGORIES, CategoryOption } from '../../models/expense.model';
import { NgSelectModule } from '@ng-select/ng-select';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';


@Component({
  selector: 'app-expense-form',
  imports: [CommonModule, ReactiveFormsModule, LucideAngularModule, NgSelectModule],
  templateUrl: './expense-form.html',
  styleUrl: './expense-form.css',
})
export class ExpenseFormComponent implements OnInit, AfterViewInit, OnDestroy {
  readonly PlusIcon = Plus;
  readonly PencilIcon = Pencil;
  
  @ViewChild('dateInput') dateInput!: ElementRef<HTMLInputElement>;
  
  expenseForm!: FormGroup;
  categories = EXPENSE_CATEGORIES;
  categoryOptions: CategoryOption[] = [
    { value: 'Food', label: 'Food', icon: Utensils, color: '#FF6B6B' },
    { value: 'Rent', label: 'Rent', icon: Home, color: '#4ECDC4' },
    { value: 'Transport', label: 'Transport', icon: Car, color: '#95E1D3' },
    { value: 'Entertainment', label: 'Entertainment', icon: Film, color: '#F38181' },
    { value: 'Utilities', label: 'Utilities', icon: Lightbulb, color: '#AA96DA' },
    { value: 'Healthcare', label: 'Healthcare', icon: Activity, color: '#FCBAD3' },
    { value: 'Shopping', label: 'Shopping', icon: ShoppingBag, color: '#FDB44B' },
    { value: 'Education', label: 'Education', icon: BookOpen, color: '#A8D8EA' },
    { value: 'Other', label: 'Other', icon: Package, color: '#C7CEEA' }
  ];
  isEditMode = false;
  expenseId: string | null = null;
  submitted = false;
  private flatpickrInstance: any = null;

  constructor(
    private fb: FormBuilder,
    private expenseService: ExpenseService,
    private router: Router,
    private route: ActivatedRoute,
    @Inject(PLATFORM_ID) private platformId: Object
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

  ngAfterViewInit(): void {
    // Only initialize Flatpickr in browser environment (not during SSR)
    if (isPlatformBrowser(this.platformId) && this.dateInput?.nativeElement) {
      this.flatpickrInstance = flatpickr(this.dateInput.nativeElement, {
        dateFormat: 'Y-m-d',
        defaultDate: this.expenseForm.get('date')?.value || new Date(),
        onChange: (selectedDates, dateStr) => {
          this.expenseForm.patchValue({ date: dateStr });
        },
        disableMobile: true,
      });
    }
  }

  ngOnDestroy(): void {
    if (this.flatpickrInstance && typeof this.flatpickrInstance.destroy === 'function') {
      this.flatpickrInstance.destroy();
    }
  }
}
