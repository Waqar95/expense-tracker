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
}
