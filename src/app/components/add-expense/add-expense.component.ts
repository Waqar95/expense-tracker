import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Expense } from '../../models/expense.model';
import { ExpenseService } from '../../services/expense.service';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-add-expense',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-expense.component.html',
  styleUrls: ['./add-expense.component.css'],
})
export class AddExpenseComponent implements OnInit {
  expense: Expense = this.getEmptyExpense();
  isEditing = false;

  defaultCategories: string[] = [
    'Groceries',
    'Transport',
    'Bills',
    'Entertainment',
    'Dining Out',
    'Health',
    'Education',
    'Shopping',
    'Travel',
    'Others',
    'Custom',
  ];

  useCustomCategory = false;

  constructor(
    private expenseService: ExpenseService,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.expenseService.editingExpense$.subscribe((expense) => {
      if (expense) {
        this.expense = { ...expense };
        this.isEditing = true;
      }
    });
  }

  onSubmit(): void {
    if (this.isEditing) {
      this.expenseService.updateExpense(this.expense);
      this.toastService.show('Expense updated!');
    } else {
      const newExpense = { ...this.expense, id: Date.now() };
      this.expenseService.addExpense(newExpense);
      this.toastService.show('Expense added!');
    }

    this.expense = this.getEmptyExpense();
    this.isEditing = false;
    this.expenseService.setEditingExpense(null);
  }

  private getEmptyExpense(): Expense {
    return {
      id: 0,
      title: '',
      amount: 0,
      category: '',
      date: new Date(),
    };
  }

  formatDateForInput(date: Date): string {
    return date.toISOString().split('T')[0];
  }
}
