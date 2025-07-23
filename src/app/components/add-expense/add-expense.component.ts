import { Component } from '@angular/core';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ExpenseService } from '../../services/expense.service';

@Component({
  selector: 'app-add-expense',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-expense.component.html',
  styleUrls: ['./add-expense.component.css'],
})
export class AddExpenseComponent {
  expenseForm: FormGroup;

  constructor(private fb: FormBuilder, private expenseService: ExpenseService) {
    this.expenseForm = this.fb.group({
      title: ['', Validators.required],
      amount: [0, [Validators.required, Validators.min(0.01)]],
      category: ['', Validators.required],
      date: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.expenseForm.valid) {
      const newExpense = {
        id: Date.now(),
        ...this.expenseForm.value,
        date: new Date(this.expenseForm.value.date),
      };
      this.expenseService.addExpense(newExpense);
      this.expenseForm.reset();
    }
  }
}
