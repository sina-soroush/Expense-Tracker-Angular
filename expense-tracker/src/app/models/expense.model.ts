export interface Expense {
  id: string;
  title: string;
  amount: number;
  category: string;
  date: Date;
}

export interface CategoryOption {
  value: string;
  label: string;
  icon: any; // Lucide icon
  color: string;
}

export const EXPENSE_CATEGORIES = [
  'Food',
  'Rent',
  'Transport',
  'Entertainment',
  'Utilities',
  'Healthcare',
  'Shopping',
  'Education',
  'Other'
] as const;

export type ExpenseCategory = typeof EXPENSE_CATEGORIES[number];
