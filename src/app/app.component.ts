import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule],
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
          <select id="currency" (change)="setCurrency($event.target.value)">
            <option value="₹">₹ (INR)</option>
            <option value="$">$ (USD)</option>
            <option value="€">€ (EUR)</option>
            <option value="£">£ (GBP)</option>
            <option value="¥">¥ (JPY)</option>
          </select>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./app.component.css'],
})
export class AppComponent {}
