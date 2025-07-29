# ExpenseTracker

A simple yet powerful Expense Tracker built with Angular (Standalone Components). Users can log daily expenses, choose categories, filter and edit entries, see summaries, and track spending over time — all with a clean, responsive UI.

## 🚀 Features

- Add, edit, delete expenses
- Categorize expenses with default or custom categories
- Filter by category
- Currency selection (₹, $, €, etc.)
- Toast notifications for actions
- Delete confirmation popup
- Summary of spending by category and total
- Responsive design
- Data stored in browser (localStorage)

## 🛠 Tech Stack

- Angular 17+
- Standalone Components
- RxJS `BehaviorSubject`
- HTML/CSS
- localStorage
- No external UI libraries (fully customizable)

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
