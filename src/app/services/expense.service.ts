import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Expense } from '../models/expense.model';

@Injectable({
  providedIn: 'root',
})
export class ExpenseService {
  private expenses: Expense[] = [];
  private expensesSubject = new BehaviorSubject<Expense[]>([]);
  expenses$ = this.expensesSubject.asObservable();

  private currencySubject = new BehaviorSubject<string>(
    this.getSavedCurrency()
  );
  currency$ = this.currencySubject.asObservable();

  private editingExpenseSubject = new BehaviorSubject<Expense | null>(null);
  editingExpense$ = this.editingExpenseSubject.asObservable();

  constructor() {
    this.loadExpenses();
  }

  // ------------------------
  // Currency Management
  // ------------------------

  setCurrency(currency: string): void {
    this.currencySubject.next(currency);
    localStorage.setItem('currency', currency);
  }

  private getSavedCurrency(): string {
    return localStorage.getItem('currency') || '₹';
  }

  // ------------------------
  // Editing Support
  // ------------------------

  setEditingExpense(expense: Expense | null): void {
    this.editingExpenseSubject.next(expense);
  }

  // ------------------------
  // Expense CRUD
  // ------------------------

  getExpenses(): Expense[] {
    return [...this.expenses];
  }

  addExpense(expense: Expense): void {
    this.expenses.push(expense);
    this.saveExpenses();
    this.expensesSubject.next([...this.expenses]);
  }

  updateExpense(updatedExpense: Expense): void {
    const index = this.expenses.findIndex((e) => e.id === updatedExpense.id);
    if (index !== -1) {
      this.expenses[index] = updatedExpense;
      this.saveExpenses();
      this.expensesSubject.next([...this.expenses]);
    }
  }

  deleteExpense(id: number): void {
    this.expenses = this.expenses.filter((e) => e.id !== id);
    this.saveExpenses();
    this.expensesSubject.next([...this.expenses]);
  }

  // ------------------------
  // Local Storage Persistence
  // ------------------------

  private saveExpenses(): void {
    localStorage.setItem('expenses', JSON.stringify(this.expenses));
  }

  private loadExpenses(): void {
    const data = localStorage.getItem('expenses');
    if (data) {
      this.expenses = JSON.parse(data).map((e: any) => ({
        ...e,
        date: new Date(e.date),
      }));
      this.expensesSubject.next([...this.expenses]);
    }
  }
}
