import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ExpenseService } from '../../services/expense.service';
import { Expense } from '../../models/expense.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-expense-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './expense-list.component.html',
  styleUrls: ['./expense-list.component.css'],
})
export class ExpenseListComponent implements OnInit, OnDestroy {
  allExpenses: Expense[] = [];
  filteredExpenses: Expense[] = [];
  selectedCategory: string = '';
  categories: string[] = [];
  currency: string = '₹';

  private subscriptions = new Subscription();

  constructor(private expenseService: ExpenseService) {}

  ngOnInit(): void {
    this.subscriptions.add(
      this.expenseService.expenses$.subscribe((expenses) => {
        this.allExpenses = expenses;
        this.categories = [...new Set(expenses.map((e) => e.category))];
        this.applyFilter();
      })
    );

    this.subscriptions.add(
      this.expenseService.currency$.subscribe((currency) => {
        console.log('[LIST] Currency:', currency); // ✅ Add this to test
        this.currency = currency;
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  applyFilter(): void {
    this.filteredExpenses = this.selectedCategory
      ? this.allExpenses.filter((e) => e.category === this.selectedCategory)
      : this.allExpenses;
  }

  deleteExpense(id: number): void {
    this.expenseService.deleteExpense(id);
  }

  editExpense(expense: Expense): void {
    this.expenseService.setEditingExpense(expense);
  }
}
