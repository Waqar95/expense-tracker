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

  setCurrency(currency: string): void {
    this.currencySubject.next(currency);
    localStorage.setItem('currency', currency);
  }

  private getSavedCurrency(): string {
    return localStorage.getItem('currency') || '₹';
  }

  private editingExpenseSubject = new BehaviorSubject<Expense | null>(null);
  editingExpense$ = this.editingExpenseSubject.asObservable();

  setEditingExpense(expense: Expense | null) {
    this.editingExpenseSubject.next(expense);
  }

  constructor() {
    this.loadExpenses();
  }

  getExpenses(): Expense[] {
    return [...this.expenses]; // return a copy
  }

  addExpense(expense: Expense): void {
    this.expenses.push(expense);
    this.saveExpenses();
    this.expensesSubject.next([...this.expenses]);
  }

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
  deleteExpense(id: number): void {
    this.expenses = this.expenses.filter((e) => e.id !== id);
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
}
