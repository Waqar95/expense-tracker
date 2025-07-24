import { Component, OnInit } from '@angular/core';
import { CommonModule, AsyncPipe } from '@angular/common';
import { ExpenseService } from '../../services/expense.service';
import { Expense } from '../../models/expense.model';
import { Observable } from 'rxjs';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-expense-list',
  standalone: true,
  imports: [CommonModule, AsyncPipe, FormsModule],
  templateUrl: './expense-list.component.html',
  styleUrls: ['./expense-list.component.css'],
})
export class ExpenseListComponent implements OnInit {
  expenses$!: Observable<Expense[]>;
  allExpenses: Expense[] = [];
  filteredExpenses: Expense[] = [];
  selectedCategory: string = '';
  categories: string[] = [];

  constructor(private expenseService: ExpenseService) {}

  ngOnInit(): void {
    this.expenseService.expenses$.subscribe((expenses) => {
      this.allExpenses = expenses;
      this.categories = [...new Set(expenses.map((e) => e.category))];
      this.applyFilter();
    });
  }

  applyFilter(): void {
    if (!this.selectedCategory) {
      this.filteredExpenses = this.allExpenses;
    } else {
      this.filteredExpenses = this.allExpenses.filter(
        (e) => e.category === this.selectedCategory
      );
    }
  }

  deleteExpense(id: number): void {
    this.expenseService.deleteExpense(id);
  }

  editExpense(expense: Expense): void {
    this.expenseService.setEditingExpense(expense);
  }
}
