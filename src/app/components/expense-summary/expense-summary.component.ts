import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExpenseService } from '../../services/expense.service';
import { Expense } from '../../models/expense.model';

@Component({
  selector: 'app-expense-summary',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './expense-summary.component.html',
  styleUrls: ['./expense-summary.component.css'],
})
export class ExpenseSummaryComponent implements OnInit {
  total = 0;
  categoryTotals: { [key: string]: number } = {};

  constructor(private expenseService: ExpenseService) {}

  ngOnInit(): void {
    const expenses = this.expenseService.getExpenses();
    this.total = expenses.reduce((sum, e) => sum + e.amount, 0);

    this.categoryTotals = {};
    for (const expense of expenses) {
      if (!this.categoryTotals[expense.category]) {
        this.categoryTotals[expense.category] = 0;
      }
      this.categoryTotals[expense.category] += expense.amount;
    }
  }
}
