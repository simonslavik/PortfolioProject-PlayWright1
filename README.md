# Sauce Demo E2E Test Suite with Playwright

End-to-end test automation suite built with **Playwright** testing framework for the Sauce Demo e-commerce application.

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Running Tests](#running-tests)
- [Test Coverage](#test-coverage)
- [Architecture](#architecture)
- [Advanced Features](#advanced-features)
- [CI/CD Integration](#cicd-integration)
- [Contributing](#contributing)

---

## Overview

This project tests the **Sauce Demo** e-commerce application (https://www.saucedemo.com/) with comprehensive test cases covering:

- User Authentication (Login scenarios)
- Product Catalog (Browsing, Sorting, Filtering)
- Shopping Cart Operations
- Checkout Process & Validation
- Session Management & Security
- UI/Usability Testing
- API Integration Testing
- Visual Regression Testing
- Data-Driven Testing

---

## Features

### Architecture

- **Page Object Model (POM)** - Structured page abstractions
- **Custom Fixtures** - Reusable test setup with authentication
- **TypeScript Support** - Type-safe selectors and interactions
- **Modular Organization** - Separate test files for each feature area

### Testing Coverage

- **Functional Testing** - Complete user workflows
- **Negative Testing** - Error handling and validation
- **API Testing** - HTTP request validation
- **Visual Regression** - Screenshot comparison
- **Data-Driven Tests** - Parameterized test execution

### Reporting

- **Multi-Format Reports** - HTML, JSON, JUnit
- **Screenshot Capture** - Automatic on-failure screenshots
- **Video Recording** - Test execution videos
- **Trace Files** - Detailed test debugging
- **CI/CD Integration** - GitHub Actions workflows

---

## Project Structure

```
PortfolioProject-PlayWright/
├── tests/
│   ├── pages/
│   │   └── BasePage.ts              # Page Object Models
│   ├── fixtures.ts                  # Custom Playwright fixtures
│   ├── Login-TestCases.spec.js      # Login test scenarios (TC-01 to TC-05)
│   ├── ProductPage-TestCases.spec.js # Product page tests (TC-06 to TC-10)
│   ├── Cart-TestCases.spec.js       # Shopping cart tests (TC-11 to TC-14)
│   ├── Checkout-TestCases.spec.js   # Checkout flow tests (TC-15 to TC-19)
│   ├── Logout-TestCases.spec.js     # Logout tests (TC-20 to TC-21)
│   ├── SecuritySession-TestCases.spec.js # Security tests (TC-22 to TC-23)
│   ├── UI-Usability-TestCases.spec.js    # UI tests (TC-24 to TC-25)
│   ├── DataDriven-Tests.spec.js     # Parameterized data-driven tests
│   ├── VisualRegression-Tests.spec.js    # Visual regression tests
│   ├── API-Tests.spec.js            # API integration tests
│   └── example.spec.js              # Example test file
├── .github/workflows/
│   └── playwright.yml               # GitHub Actions CI/CD
├── playwright.config.js             # Playwright configuration
├── playwright-report/               # Generated HTML reports
├── test-results/                    # Test artifacts (videos, traces)
├── screenshots/                     # Screenshot artifacts
├── package.json
└── README.md
```

---

## Installation

### Prerequisites

- **Node.js** 16+ (LTS recommended)
- **npm** or **yarn**
- Git

### Setup Steps

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd PortfolioProject-PlayWright
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Install Playwright browsers**

   ```bash
   npx playwright install
   ```

4. **Verify installation**
   ```bash
   npx playwright --version
   ```

---

## Running Tests

### Run All Tests

```bash
npx playwright test
```

### Run Tests by Browser

```bash
# Chromium only
npx playwright test --project=chromium

# Firefox only
npx playwright test --project=firefox

# Safari (webkit) only
npx playwright test --project=webkit

# Multiple browsers
npx playwright test --project=chromium --project=firefox
```

### Run Specific Test File

```bash
npx playwright test tests/Login-TestCases.spec.js
npx playwright test tests/ProductPage-TestCases.spec.js
npx playwright test tests/DataDriven-Tests.spec.js
```

### Run Tests by Pattern

```bash
# Run all login tests
npx playwright test --grep "Login"

# Run all checkout tests
npx playwright test --grep "Checkout"

# Run only visual regression tests
npx playwright test VisualRegression
```

### Run Tests in Debug Mode

```bash
npx playwright test --debug
```

### Run Tests in Headed Mode (see browser)

```bash
npx playwright test --headed
```

### Run Tests with Trace

```bash
npx playwright test --trace on
```

### View Test Report

```bash
npx playwright show-report
```

---

## Test Coverage

### Test Cases

#### Login Test Cases (TC-01 to TC-05)

- TC-01: Login with valid credentials
- TC-02: Login with invalid username
- TC-03: Login with invalid password
- TC-04: Login with empty credentials
- TC-05: Login with locked-out user

#### Product Page Test Cases (TC-06 to TC-10)

- TC-06: Verify product list is displayed
- TC-07: Add single product to cart
- TC-08: Remove product from cart
- TC-09: Add multiple products to cart
- TC-10: Verify product sorting (low to high)

#### Cart Test Cases (TC-11 to TC-14)

- TC-11: Navigate to cart page
- TC-12: Verify selected items appear in cart
- TC-13: Remove item from cart page
- TC-14: Continue shopping from cart

#### Checkout Test Cases (TC-15 to TC-19)

- TC-15: Proceed to checkout
- TC-16: Checkout with valid user information
- TC-17: Checkout with missing first name (validation)
- TC-18: Verify total price calculation
- TC-19: Complete checkout process

#### Logout Test Cases (TC-20 to TC-21)

- TC-20: Logout from application
- TC-21: Verify session ends after logout

#### Security & Session Tests (TC-22 to TC-23)

- TC-22: Access product page without login
- TC-23: Refresh page after logout

#### UI & Usability Tests (TC-24 to TC-25)

- TC-24: Verify error messages are readable
- TC-25: Verify buttons are clickable and responsive

#### Data-Driven Tests

- Multiple login scenarios with different credentials
- Checkout form validation with multiple data sets
- Product sorting with various options

#### Visual Regression Tests

- Login page layout
- Inventory page layout
- Product card styling
- Cart page layout
- Checkout form layout
- Error message styling

#### API Tests

- Product endpoint verification
- Login endpoint validation
- Combined UI + API testing

---

## Architecture

### Page Object Model

The project uses a structured POM pattern for maintainability:

```typescript
// Example: LoginPage.ts
export class LoginPage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto("https://www.saucedemo.com/");
  }

  async login(username: string, password: string) {
    await this.fillUsername(username);
    await this.fillPassword(password);
    await this.clickLogin();
  }

  // ... other methods
}
```

### Custom Fixtures

Reusable fixtures for common test setup:

```typescript
// fixtures.ts
export const test = base.extend<TestFixtures>({
  authenticatedPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login("standard_user", "secret_sauce");
    await use(page);
  },
});
```

### Test Organization

Tests are organized by feature:

- Login tests
- Product page tests
- Cart tests
- Checkout tests
- Security/Session tests
- UI/Usability tests

---

## Advanced Features

### Data-Driven Testing

Run the same test with multiple data sets:

```javascript
const loginTestData = [
  { username: "standard_user", password: "secret_sauce", shouldSucceed: true },
  { username: "invalid_user", password: "secret_sauce", shouldSucceed: false },
  // ... more data
];

loginTestData.forEach(({ username, password, shouldSucceed }) => {
  test(`Login with ${username}`, async ({ page }) => {
    // test implementation
  });
});
```

### Visual Regression Testing

Capture and compare screenshots:

```javascript
await expect(page).toHaveScreenshot("login-page.png", {
  maxDiffPixels: 100,
});
```

### API Testing

Validate both UI and API responses:

```javascript
const response = await request.get("https://www.saucedemo.com/inventory.html");
expect(response.status()).toBe(200);
```

---

## CI/CD Integration

### GitHub Actions

The project includes an automated GitHub Actions workflow that:

- Runs on every push and pull request
- Tests across multiple Node versions (18.x, 20.x)
- Tests across multiple browsers (Chromium, Firefox, WebKit)
- Retries failed tests automatically
- Uploads test reports and videos as artifacts
- Generates detailed test results

**Workflow file:** `.github/workflows/playwright.yml`

### Configuration Highlights

```javascript
// playwright.config.js
export default defineConfig({
  testDir: "./tests",
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [
    ["html", { outputFolder: "playwright-report" }],
    ["json", { outputFile: "test-results/results.json" }],
    ["junit", { outputFile: "test-results/junit.xml" }],
  ],
  use: {
    screenshot: "only-on-failure",
    video: "retain-on-failure",
    trace: "on-first-retry",
  },
});
```

---

## Performance & Best Practices

### Test Optimization

- Parallel test execution (when safe)
- Optimized selectors (role-based, data-test)
- Smart waits (auto-wait for elements)
- Fixture reuse to reduce setup time

### Code Quality

- TypeScript for type safety
- Consistent naming conventions
- DRY principles (Page Object Model)
- Clear test descriptions
- Proper error handling

### Test Reliability

- Retry logic for flaky tests
- Explicit waits instead of sleep()
- Trace collection for debugging
- Screenshot on failure
- Video recording on failure

---

## Troubleshooting

### Tests Timing Out

```bash
# Increase timeout
npx playwright test --timeout=60000
```

### Browser Installation Issues

```bash
# Reinstall browsers
npx playwright install --with-deps
```

### Debug Specific Test

```bash
# Run with inspector
npx playwright test --debug tests/Login-TestCases.spec.js
```

### Check Test Results

```bash
# View HTML report
npx playwright show-report

# View trace files
npx playwright show-trace test-results/trace.zip
```

---

## Resources

- **Playwright Docs:** https://playwright.dev/
- **Playwright Best Practices:** https://playwright.dev/docs/best-practices
- **Sauce Demo:** https://www.saucedemo.com/
- **GitHub Actions:** https://github.com/features/actions

---

## Contributing

Contributions welcome! Please follow these guidelines:

1. Create a feature branch
2. Add tests for new features
3. Ensure all tests pass
4. Submit a pull request

---

## License

This project is open source and available under the MIT License.

---

## Contact

For questions about this project or Playwright automation, feel free to reach out!

**Project:** Playwright Test Automation Suite  
**Technologies:** Playwright, TypeScript, Node.js, GitHub Actions
