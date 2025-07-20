import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Expense } from '../models/expense.model';

@Injectable({
  providedIn: 'root',
})
export class ExpenseService {
  private expenses: Expense[] = [];
  private expensesSubject = new BehaviorSubject<Expense[]>(this.expenses);

  expenses$ = this.expensesSubject.asObservable();

  constructor() {}

  getExpenses(): Expense[] {
    return this.expenses;
  }
  addExpenses(expense: Expense) {
    this.expenses.push(expense);
    this.expensesSubject.next(this.expenses);
  }
}
