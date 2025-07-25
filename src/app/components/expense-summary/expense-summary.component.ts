import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExpenseService } from '../../services/expense.service';
import { Expense } from '../../models/expense.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-expense-summary',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './expense-summary.component.html',
  styleUrls: ['./expense-summary.component.css'],
})
export class ExpenseSummaryComponent implements OnInit, OnDestroy {
  total = 0;
  currency = '₹'; // fallback
  categoryTotals: { [key: string]: number } = {};
  private subscriptions = new Subscription();

  constructor(private expenseService: ExpenseService) {}

  ngOnInit(): void {
    // Subscribe to currency changes
    this.subscriptions.add(
      this.expenseService.currency$.subscribe((c) => {
        console.log('[SUMMARY] Currency:', c); // Add log
        this.currency = c;
      })
    );

    // Subscribe to expenses
    this.subscriptions.add(
      this.expenseService.expenses$.subscribe((expenses: Expense[]) => {
        this.total = expenses.reduce((sum, e) => sum + e.amount, 0);
        this.categoryTotals = {};
        for (const expense of expenses) {
          if (!this.categoryTotals[expense.category]) {
            this.categoryTotals[expense.category] = 0;
          }
          this.categoryTotals[expense.category] += expense.amount;
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
