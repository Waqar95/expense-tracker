import { Component } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router';
import { ToastComponent } from './components/toast/toast.component';
import { ExpenseService } from './services/expense.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule, ToastComponent],
  styleUrls: ['./app.component.css'],
  template: `
    <div class="container">
      <header>
        <h1>Expense Tracker</h1>

        <nav class="nav-tabs">
          <a routerLink="/add" routerLinkActive="active">Add Expense</a>
          <a routerLink="/list" routerLinkActive="active">Expense List</a>
          <a routerLink="/summary" routerLinkActive="active">Summary</a>
        </nav>

        <div class="currency-selector">
          <label for="currency">Currency:</label>
          <select id="currency" (change)="setCurrency($event)">
            <option value="₹">Rs (PKR)</option>
            <option value="$">$ (USD)</option>
            <option value="€">€ (EUR)</option>
            <option value="£">£ (GBP)</option>
            <option value="¥">¥ (JPY)</option>
          </select>
        </div>
      </header>

      <main>
        <router-outlet></router-outlet>
      </main>

      <app-toast></app-toast>
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
