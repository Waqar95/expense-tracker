import { Routes } from '@angular/router';
import { AddExpenseComponent } from './components/add-expense/add-expense.component';
import { ExpenseListComponent } from './components/expense-list/expense-list.component';
import { ExpenseSummaryComponent } from './components/expense-summary/expense-summary.component';

export const routes: Routes = [
  { path: '', redirectTo: 'add', pathMatch: 'full' },
  { path: 'add', component: AddExpenseComponent },
  { path: 'list', component: ExpenseListComponent },
  { path: 'summary', component: ExpenseSummaryComponent },
];
