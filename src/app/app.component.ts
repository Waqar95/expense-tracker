import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule],
  template: `
    <div style="max-width: 700px; margin: auto; padding: 1rem;">
      <h1>Expense Tracker</h1>

      <nav class="nav-tabs">
        <a routerLink="/add" routerLinkActive="active">Add Expense</a>
        <a routerLink="/list" routerLinkActive="active">Expense List</a>
        <a routerLink="/summary" routerLinkActive="active">Summary</a>
      </nav>

      <router-outlet></router-outlet>
    </div>
  `,
  styleUrls: ['./app.component.css'],
})
export class AppComponent {}
