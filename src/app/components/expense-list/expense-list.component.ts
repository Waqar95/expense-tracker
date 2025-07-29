import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AsyncPipe } from '@angular/common';
import { ExpenseService } from '../../services/expense.service';
import { ToastService } from '../../services/toast.service';
import { Expense } from '../../models/expense.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-expense-list',
  standalone: true,
  imports: [CommonModule, FormsModule, AsyncPipe],
  templateUrl: './expense-list.component.html',
  styleUrls: ['./expense-list.component.css'],
})
export class ExpenseListComponent implements OnInit {
  expenses: Expense[] = [];
  filteredExpenses: Expense[] = [];
  selectedCategory: string = '';
  categories: string[] = [];
  currency: string = '₹';

  constructor(
    private expenseService: ExpenseService,
    private toastService: ToastService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.expenseService.expenses$.subscribe((expenses) => {
      this.expenses = expenses;
      this.extractCategories();
      this.applyFilter();
    });

    this.expenseService.currency$.subscribe((c) => {
      this.currency = c;
    });
  }

  extractCategories(): void {
    const all = this.expenses.map((e) => e.category);
    this.categories = Array.from(new Set(all)).filter(Boolean);
  }

  applyFilter(): void {
    if (this.selectedCategory) {
      this.filteredExpenses = this.expenses.filter(
        (e) => e.category === this.selectedCategory
      );
    } else {
      this.filteredExpenses = [...this.expenses];
    }
  }

  editExpense(expense: Expense): void {
    this.expenseService.setEditingExpense(expense);
    this.toastService.show('Expense loaded for editing');
    this.router.navigate(['/add']); // if routing is used
  }

  deleteExpense(id: number): void {
    const confirmed = window.confirm(
      'Are you sure you want to delete this expense?'
    );
    if (confirmed) {
      this.expenseService.deleteExpense(id);
    }
  }
}
