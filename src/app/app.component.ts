import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AddExpenseComponent } from './components/add-expense/add-expense.component';
import { ExpenseListComponent } from './components/expense-list/expense-list.component';
import { ExpenseSummaryComponent } from './components/expense-summary/expense-summary.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    AddExpenseComponent,
    ExpenseListComponent,
    ExpenseSummaryComponent,
  ],
  template: `
    <div style="max-width: 600px; margin: auto; padding: 1rem;">
      <h1>Expense Tracker</h1>
      <app-add-expense></app-add-expense>
      <app-expense-list></app-expense-list>
      <app-expense-summary></app-expense-summary>
    </div>
  `,
  styleUrls: ['./app.component.css'],
})
export class AppComponent {}
