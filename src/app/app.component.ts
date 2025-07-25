import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ExpenseService } from './services/expense.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule],
  styleUrls: ['./app.component.css'],
  template: `
    <div style="max-width: 700px; margin: auto; padding: 1rem;">
      <h1>Expense Tracker</h1>

      <div
        style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;"
      >
        <nav class="nav-tabs">
          <a routerLink="/add" routerLinkActive="active">Add Expense</a>
          <a routerLink="/list" routerLinkActive="active">Expense List</a>
          <a routerLink="/summary" routerLinkActive="active">Summary</a>
        </nav>

        <div>
          <label for="currency">Currency:</label>
          <select id="currency" (change)="setCurrency($event)">
            <option value="Rs">Rs (PKR))</option>
            <option value="$">$ (USD)</option>
            <option value="€">€ (EUR)</option>
            <option value="£">£ (GBP)</option>
            <option value="¥">¥ (JPY)</option>
          </select>
        </div>
      </div>

      <router-outlet></router-outlet>
    </div>
  `,
})
export class AppComponent {
  constructor(private expenseService: ExpenseService) {}

  setCurrency(event: Event): void {
    const select = event.target as HTMLSelectElement;
    this.expenseService.setCurrency(select.value);
  }
}
