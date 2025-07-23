import { Component, OnInit } from '@angular/core';
import { CommonModule, AsyncPipe } from '@angular/common';
import { ExpenseService } from '../../services/expense.service';
import { Expense } from '../../models/expense.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-expense-list',
  standalone: true,
  imports: [CommonModule, AsyncPipe],
  templateUrl: './expense-list.component.html',
  styleUrls: ['./expense-list.component.css'],
})
export class ExpenseListComponent implements OnInit {
  expenses$!: Observable<Expense[]>;

  constructor(private expenseService: ExpenseService) {}

  ngOnInit(): void {
    this.expenses$ = this.expenseService.expenses$;
  }
  deleteExpense(id: number): void {
    this.expenseService.deleteExpense(id);
  }
}
