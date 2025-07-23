import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ExpenseService } from '../../services/expense.service';
import { Expense } from '../../models/expense.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-expense',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-expense.component.html',
  styleUrls: ['./add-expense.component.css'],
})
export class AddExpenseComponent implements OnInit, OnDestroy {
  expenseForm: FormGroup;
  editingExpense: Expense | null = null;
  private subscription!: Subscription;

  constructor(private fb: FormBuilder, private expenseService: ExpenseService) {
    this.expenseForm = this.fb.group({
      title: ['', Validators.required],
      amount: [0, [Validators.required, Validators.min(0.01)]],
      category: ['', Validators.required],
      date: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.subscription = this.expenseService.editingExpense$.subscribe(
      (expense) => {
        this.editingExpense = expense;
        if (expense) {
          this.expenseForm.patchValue({
            title: expense.title,
            amount: expense.amount,
            category: expense.category,
            date: expense.date.toISOString().substring(0, 10),
          });
        }
      }
    );
  }

  onSubmit() {
    if (this.expenseForm.valid) {
      const formValue = this.expenseForm.value;
      const expense: Expense = {
        id: this.editingExpense ? this.editingExpense.id : Date.now(),
        title: formValue.title,
        amount: formValue.amount,
        category: formValue.category,
        date: new Date(formValue.date),
      };

      if (this.editingExpense) {
        this.expenseService.updateExpense(expense);
      } else {
        this.expenseService.addExpense(expense);
      }

      this.expenseForm.reset();
      this.editingExpense = null;
      this.expenseService.setEditingExpense(null);
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
