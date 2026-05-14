# TUI Netherlands - Holiday Booking Automation Case

This project demonstrates a robust, automated end-to-end user journey for the [TUI](https://tui.nl) holiday booking process. Built with **Playwright**, **TypeScript 6.0**, and a strong focus on **clean code**, **intentional design**, and **production-ready CI/CD pipelines**.

## 📋 Pre-requisites

Before running the project locally, please ensure you have the following installed:

- **Node.js**: Version **v24.15.0** (LTS/Current).
- **NPM**: Version **v11.x**.

## 🚀 Quick Start

1. **Install dependencies:**

   ```bash
   npm install
   ```

   _Note: Using `npm ci` is highly recommended instead of `npm install` to ensure exact dependency versions locked in `package-lock.json` on CI._

2. **Install Playwright Browsers:**

   ```bash
   npm run test:setup
   ```

3. **Run Tests:**
   ```bash
   npm run test
   ```

## 🛠 Available Scripts

All lifecycle commands are optimized to reduce script duplication in `package.json` by leveraging native npm execution flags.

| Command               | Description                                                                                  |
| :-------------------- | :------------------------------------------------------------------------------------------- |
| `npm run build`       | Performs a full health check: formatting, linting, and type-checking. Ideal for CI/CD.       |
| `npm run build:fix`   | Automatically formats, fixes linting issues, and verifies types. Use this before committing. |
| `npm run clean`       | Resets the workspace by deleting test reports, screenshots, and artifacts via native Node.   |
| `npm run test`        | Runs all E2E tests in headless mode (natively overridden to variable threads on CI).         |
| `npm run test:setup`  | Installs required Playwright browsers (Chromium, WebKit, Firefox) and system dependencies.   |
| `npm run test:ui`     | Opens Playwright UI Mode for interactive debugging and time-travel.                          |
| `npm run test:report` | Opens the last generated HTML test report.                                                   |
| `npm run test:update` | Updates baseline visual screenshots exclusively for tests tagged with `@visual`.             |
| `npm run lint`        | Runs ESLint 10 to check for code quality and standard adherence.                             |
| `npm run format`      | Checks if project files follow formatting rules using Prettier.                              |
| `npm run tsc:check`   | Runs the TypeScript compiler in `noEmit` mode to ensure full type safety.                    |
| `npm run deps:update` | Updates all project dependencies to their latest versions and syncs the lockfile.            |

### 🎯 Playwright Execution Guide

To ensure high maintainability and cost-effective execution, the suite is designed to be selective. Use the `--` separator to pass additional arguments to the test runner.

- **Run all tests:**  
  `npm run test`
- **Run tests by tag:**  
  `npm run test -- --grep "@functional"`
- **Run tests by project:**  
  `npm run test -- --project="Google Chrome"`
- **Run tests by tag and project combined:**  
  `npm run test -- --grep "@functional" --project="Desktop Safari"`
- **Run in interactive UI mode:**  
  `npm run test:ui`

## ⚙️ Continuous Integration (GitHub Actions CI/CD)

The repository implements three independent, highly optimized CI/CD workflows under `.github/workflows/` to mirror commercial development standards:

1. **`TUI Code Quality CI` (`ci.yaml`):** An automated pipeline triggered on every **Pull Request** and **Push (Merge)** targeting the `main` branch. It ensures that no code violating TypeScript typing or Prettier rules enters the repository.
2. **`Playwright E2E Tests` (`playwright-e2e.yml`):** A manual pipeline (`workflow_dispatch`) equipped with advanced UI control. It allows selecting the target branch, dynamically setting the parallel thread execution count (`workers_count`: 1, 2, 4, 6, 8), and specifying retry attempts (`retries_count`: 0, 1, 2) using native `PLAYWRIGHT_WORKERS`/`PLAYWRIGHT_RETRIES` variables.
3. **`Update Playwright Snapshots` (`update-screenshots.yml`):** A manual pipeline used to securely regenerate baseline PNG files on the CI machine. It features dynamic thread allocation inputs and packages the updated `screenshots/` directory as a downloadable ZIP archive.

## 🏗 Strategy & Technical Decisions

### 1. Component-Driven POM & Locator Scoping Architecture

To achieve enterprise-grade maintainability, the framework breaks down large web pages into small, reusable sub-components (`BaseComponent`) and nested element wrappers (`BaseElement`). This model eliminates global, fragile DOM selectors by enforcing strict **locator hierarchy, scoping via parent delegation, and fluent API implementation**.

- **Strict Parent Scoping:** Components never query the `page` instance globally. Instead, every sub-component receives a `parentLocator` via its constructor. All interior locators are chained directly from this parent reference (`this.parentLocator.locator(...)`), ensuring they only search inside their own scoped DOM tree segment.
- **Encapsulation & Dynamic Collections:** Large iterative structures, like the hotel search results list, are wrapped in a component that exposes dynamic, zero-indexed instance factories. Components within lists receive their own scoped item context from their parent, preventing test steps from leaking into neighboring DOM wrappers.
- **Fluent API & Method Chaining:** The entire framework is designed around fluid cross-page navigation and method chaining. Actions that trigger page routing or component updates explicitly return either a typed promise of the destination page (`Promise<AccommodationDetailsPage>`) or the current context (`Promise<this>`). By appending `.waitForReady()` directly to the instantiation line, the test scenarios achieve an exceptionally clean, expressive, and readable syntax while guaranteeing that subsequent actions never trigger on un-stabilized DOM elements.

```typescript
// Example of strict parent scoping combined with a fluent, chainable API
export class ResultListItemComponent extends BaseComponent {
  readonly defaultLocator: Locator;
  private readonly _continueButtonLocator: Locator;

  constructor(page: Page, parentLocator: Locator, itemLocator: Locator) {
    super(page, parentLocator);
    this.defaultLocator = itemLocator; // Scoped exclusively to this single card
    this._continueButtonLocator = this.defaultLocator
      .locator('.ResultListItemV2__packagePrice')
      .getByTestId('continue-button')
      .getByRole('button');
  }

  @step('Click continue to accommodation details page')
  async continueToAccommodationDetailsPage(): Promise<AccommodationDetailsPage> {
    await this._continueButtonLocator.click();
    // Method chaining: Returns the next Page Object instantiated and pre-stabilized
    return await new AccommodationDetailsPage(this.page).waitForReady();
  }
}
```

### 2. Strategic Handling of Randomness & Data Workarounds

The booking journey requires selecting random airports, dates, and guest ages.

- **Dynamic Selectors:** Instead of hardcoding, the project dynamically fetches available options from the UI at runtime.
- **Observability:** All selected values are logged to the console using `console.table()` for full transparency of execution data.
- **Flaky Data Circuit Breakers:** During testing, certain backend data bugs were identified (regions like _Andalusië_, _Madeira_, or _Sao Vicente_ are enabled in the UI but return zero available dates, breaking calendar steps). The framework applies a dynamic CSS exclusion layer using `:not(:has-text())` to isolate and bypass these flaky options:

```typescript
  /**
   * @todo Remove this workaround once the backend data bugs are resolved.
   * @see Bug-Tickets: [WP-1234] (Andalusië), [WP-5678] (Madeira), [WP-9012] (Sao Vicente)
   *
   * Temporary workaround:
   * Exclude specific destinations from the random selection pool due to an application bug.
   */
  private readonly _destinationCityOptionsLocator: Locator = this.defaultLocator.locator(
    '.DestinationsList__parentCheckbox:not(:has-text("Andalusië")):not(:has-text("Madeira")):not(:has-text("Sao Vicente")) input:enabled'
  );
```

### 3. Engineering Hygiene, Tooling & Async Safety

- **Strict TypeScript 6:** Configured with `strict: true` and `NodeNext` resolution to catch potential issues during development.
- **Code Quality Gates:** Integrated **ESLint 10 (Flat Config)** and **Prettier** to enforce a professional coding standard.
- **Async Return Guardrail:** The linter is configured with the `@typescript-eslint/return-await` rule set to `error`. This guarantees that forgetting an `await` keyword when returning a new page instance will immediately fail `npm run build`, ensuring precise step duration tracking by the custom `@step` decorator:

```typescript
// ✅ CORRECT - ESLint Compliant & Step-Safe
@step('Click continue to accommodation details page')
async continueToAccommodationDetailsPage(): Promise<AccommodationDetailsPage> {
  await this._continueButtonLocator.click();
  return await new AccommodationDetailsPage(this.page).waitForReady();
}
```

### 4. Robust Assertions, Visual Regression & SPA Stability

- **Web-First Assertions:** Focus is placed on native assertions. In the Passenger Details section, the suite validates specific message contents and accessibility ARIA states.
- **Visual Regression Stability:** Generating snapshots on slow CI runners can trigger timeouts due to rendering lags. The assertion utility explicitly handles `.waitFor({ state: 'visible' })` and extends the local `toHaveScreenshot()` timeout to 15 seconds, ensuring pixel comparison only triggers on a fully stabilized layout.
- **SPA Component Synchronization:** TUI forms re-render dynamically in the background (e.g., text swapping from `"Verder"` to `"Boek Nu"`). The framework avoids `element detached from DOM` errors by filtering elements via `.filter({ hasText })`, leveraging Playwright's native auto-waiting mechanisms:

```typescript
// Dynamic locator definition filtering buttons safely by visible user text node
private readonly _continueButtonLocator = (text: string): Locator =>
  this.defaultLocator.getByRole('button').filter({ hasText: text });
```

## 📁 Project Structure

The simplified directory layout cleanly decouples test scenarios (`specs/`) from the automated framework core (`src/`), ensuring clean separation of concerns:

```text
├── .github/workflows/
│   ├── ci.yaml                   # Quality gate automation (Runs on PR/Merge)
│   ├── playwright-e2e.yml        # Manual regression pipeline with dynamic worker inputs
│   └── update-screenshots.yml    # Manual visual snapshot regeneration pipeline
├── screenshots/                  # Baseline reference images for visual tests (@visual)
├── specs/                        # E2E test suites and scenario configurations
│   ├── auth/cookies.json         # Session state layer for authenticated requests
│   └── journeys/book/passengerdetails/passenger.details.spec.ts  # Main suite
├── src/                          # Production-grade framework source code
│   ├── data/                     # Enums, types, and static data dictionaries
│   ├── decorators/               # Custom method annotations (@step reporting engine)
│   ├── pages/                    # Page Object layers and composed UI components
│   │   └── components/           # Scoped component blocks (fields, modals, lists)
│   └── utils/                    # Core utilities (assertions, randomizers, loggers)
├── eslint.config.js              # Flat ESLint configurations with async return rules
├── playwright.config.ts          # Playwright configurations (60s timeout, workers: 1)
└── package.json                  # Manifest, rigid dependency versions, and npm scripts
```

---

_Thank you for reviewing this assignment. I look forward to discussing the solution._
