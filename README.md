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
- [Troubleshooting](#troubleshooting)
- [Resources](#resources)

---

## Overview

This project tests the **Sauce Demo** e-commerce application (https://www.saucedemo.com/) with comprehensive test cases covering:

- User Authentication (Login scenarios)
- Product Catalog (Browsing, Sorting)
- Shopping Cart Operations
- Session Management & Security
- UI/Usability Testing
- Data-Driven Testing
- Advanced Logging & Debugging

---

## Features

### Architecture

- **Page Object Model (POM)** - Structured page abstractions in TypeScript
- **Custom Fixtures** - Reusable test setup with authentication and logging
- **TypeScript Support** - Type-safe page objects and utilities
- **Modular Organization** - Separate test files for each feature area
- **Advanced Logging** - Custom logger with file output and test context

### Testing Coverage

- **Functional Testing** - Complete user workflows
- **Negative Testing** - Error handling and validation
- **Data-Driven Tests** - Parameterized test execution
- **Session & Security** - Access control and session management

### Reporting & Debugging

- **Multi-Format Reports** - HTML, JSON, JUnit
- **Screenshot Capture** - Automatic on-failure screenshots
- **Video Recording** - Test execution videos (on failure)
- **Trace Files** - Detailed test debugging (on first retry)
- **Custom Logging** - Structured logs with timestamps and test context

---

## Project Structure

```
PortfolioProject-PlayWright/
├── tests/
│   ├── pages/
│   │   └── BasePage.ts              # Page Object Models (Login, Inventory, Cart, Checkout)
│   ├── utils/
│   │   ├── logger.ts                # Custom logging utility
│   │   └── testUtils.ts             # Test helper functions
│   ├── config/
│   │   └── config.ts                # Test configuration and credentials
│   ├── fixtures.ts                  # Basic Playwright fixtures
│   ├── fixtures-with-logging.ts     # Extended fixtures with logging support
│   ├── Login-TestCases.spec.js      # Login test scenarios (TC-01 to TC-05)
│   ├── ProductPage-TestCases.spec.js # Product page tests (TC-10 to TC-14)
│   ├── Cart-TestCases.spec.js       # Shopping cart tests (TC-07, TC-08, TC-09, TC-11)
│   ├── Logout-TestCases.spec.js     # Logout tests (TC-15 to TC-16)
│   ├── SecuritySession-TestCases.spec.js # Security tests (TC-17 to TC-18)
│   ├── UI-Usability-TestCases.spec.js    # UI tests (TC-19 to TC-20)
│   ├── DataDriven-Tests.spec.js     # Parameterized data-driven tests
│   └── Example-WithLogging.spec.js  # Example tests with advanced logging
├── logs/                            # Test execution logs
├── screenshots/                     # Screenshot artifacts
├── test-results/                    # Test results and traces
├── playwright.config.js             # Playwright configuration
├── package.json
├── TEST_CASES.md                    # Detailed test case documentation
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
npx playwright test tests/Example-WithLogging.spec.js
```

### Run Tests by Pattern

```bash
# Run all login tests
npx playwright test --grep "Login"

# Run all cart tests
npx playwright test --grep "Cart"

# Run tests with logging
npx playwright test Example-WithLogging

# Run data-driven tests
npx playwright test DataDriven
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

## Test Coverage

### Test Cases

#### Login Test Cases (TC-01 to TC-05)

- **TC-01:** Login with valid credentials
- **TC-02:** Login with invalid username
- **TC-03:** Login with invalid password
- **TC-04:** Login with empty credentials
- **TC-05:** Login with locked-out user

#### Product Page Test Cases (TC-10 to TC-14)

- **TC-10:** Verify product list is displayed
- **TC-11:** Add single product to cart
- **TC-12:** Remove product from cart
- **TC-13:** Add multiple products to cart
- **TC-14:** Verify product sorting by price (low to high)

#### Cart Test Cases (TC-07 to TC-11)

- **TC-07:** Verify selected items appear in cart
- **TC-08:** Remove item from cart page
- **TC-09:** Continue shopping from cart
- **TC-11:** Navigate to cart page

#### Logout Test Cases (TC-15 to TC-16)

- **TC-15:** Logout from application
- **TC-16:** Verify session ends after logout

#### Security & Session Tests (TC-17 to TC-18)

- **TC-17:** Access product page without login
- **TC-18:** Refresh page after logout

#### UI & Usability Tests (TC-19 to TC-20)

- **TC-19:** Verify error messages are readable
- **TC-20:** Verify buttons are clickable and responsive

#### Data-Driven Tests

- Multiple login scenarios with different credentials (valid, invalid, locked-out)
- Automated test generation from data sets
- Comprehensive login validation matrix

#### Example Tests with Advanced Logging

- Login scenarios with detailed step-by-step logging
- Custom logger integration with test fixtures
- Screenshot capture on failure with logging
- Test execution tracking and reporting

---

## Architecture

### Page Object Model

The project uses a structured POM pattern in TypeScript for maintainability:

```typescript
// BasePage.ts contains all Page Object Models
export class LoginPage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto("https://www.saucedemo.com/");
  }

  async fillUsername(username: string) {
    await this.page.getByRole("textbox", { name: "Username" }).fill(username);
  }

  async fillPassword(password: string) {
    await this.page.getByRole("textbox", { name: "Password" }).fill(password);
  }

  async clickLogin() {
    await this.page.getByRole("button", { name: "Login" }).click();
  }

  async login(username: string, password: string) {
    await this.fillUsername(username);
    await this.fillPassword(password);
    await this.clickLogin();
  }

  async getErrorMessage() {
    return await this.page.locator('[data-test="error"]').textContent();
  }
}

// Similar classes for InventoryPage, CartPage, CheckoutPage
```

### Custom Fixtures

Two fixture implementations for different testing needs:

**Basic Fixtures** ([fixtures.ts](tests/fixtures.ts)):

```typescript
export const test = base.extend<TestFixtures>({
  authenticatedPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login("standard_user", "secret_sauce");
    await use(page);
  },
});
```

**Advanced Fixtures with Logging** ([fixtures-with-logging.ts](tests/fixtures-with-logging.ts)):

```typescript
export const test = base.extend<TestFixtures>({
  logger: async ({}, use) => {
    const logger = createLogger("test");
    await use(logger);
  },

  loginPage: async ({ page, logger }, use) => {
    const loginPage = new LoginPage(page);
    logger.info("LoginPage initialized");
    await use(loginPage);
  },
  // ... more fixtures with logging integration
});
```

### Custom Logger Utility

The project includes a custom logger ([utils/logger.ts](tests/utils/logger.ts)) that provides:

- File-based logging with timestamps
- Multiple log levels (info, warn, error, success)
- Test step tracking
- Test start/end tracking with status
- Console and file output
- Integration with Page Object fixtures

Example usage:

```typescript
const logger = createLogger("test-name");
logger.testStart("Login with valid credentials");
logger.step(1, "Navigating to login page");
logger.info("Username entered", { username: "standard_user" });
logger.success("User successfully logged in");
logger.testEnd("test-name", "PASSED");
```

### Test Organization

Tests are organized by feature area:

- **Login-TestCases.spec.js** - Authentication scenarios
- **ProductPage-TestCases.spec.js** - Product browsing and cart operations
- **Cart-TestCases.spec.js** - Shopping cart functionality
- **Logout-TestCases.spec.js** - Logout and session cleanup
- **SecuritySession-TestCases.spec.js** - Access control and security
- **UI-Usability-TestCases.spec.js** - UI validation and usability
- **DataDriven-Tests.spec.js** - Parameterized test execution
- **Example-WithLogging.spec.js** - Advanced logging demonstrations

---

## Advanced Features

### Data-Driven Testing

Run the same test logic with multiple data sets using parameterized tests:

```javascript
// DataDriven-Tests.spec.js
const loginTestData = [
  {
    username: "standard_user",
    password: "secret_sauce",
    shouldSucceed: true,
    description: "Valid credentials",
  },
  {
    username: "invalid_user",
    password: "secret_sauce",
    shouldSucceed: false,
    expectedError: "Username and password do not match",
    description: "Invalid username",
  },
  {
    username: "locked_out_user",
    password: "secret_sauce",
    shouldSucceed: false,
    expectedError: "this user has been locked out",
    description: "Locked out user",
  },
];

loginTestData.forEach(
  ({ username, password, shouldSucceed, expectedError, description }) => {
    test(`Login test - ${description}`, async ({ page }) => {
      // test implementation with dynamic data
    });
  }
);
```

### Advanced Logging System

The project includes a sophisticated logging system for enhanced debugging:

**Features:**

- Timestamped log entries
- Multiple log levels (INFO, WARN, ERROR, SUCCESS)
- File-based log storage in `logs/` directory
- Test execution tracking (start/end with status)
- Step-by-step test progression logging
- Screenshot integration on failures
- Console and file output

**Usage Example:**

```javascript
test("TC-01: Login with valid credentials - With Logging", async ({
  page,
  loginPage,
  logger,
}) => {
  const testLogger = createLogger("TC-01-login-valid");
  testLogger.testStart("Login with valid credentials");

  try {
    testLogger.step(1, "Navigating to login page");
    await loginPage.goto();

    testLogger.step(2, "Entering valid username");
    await loginPage.fillUsername(config.testUser.validUsername);
    testLogger.info("Username entered", {
      username: config.testUser.validUsername,
    });

    testLogger.step(3, "Clicking login button");
    await loginPage.clickLogin();

    testLogger.success("User successfully logged in and redirected");
    testLogger.testEnd("TC-01-login-valid", "PASSED");
  } catch (error) {
    testLogger.error("Test failed", error);
    await TestUtils.takeScreenshot(page, `TC-01-failure-${Date.now()}`);
    testLogger.testEnd("TC-01-login-valid", "FAILED");
    throw error;
  }
});
```

### Configuration Management

Centralized configuration ([config/config.ts](tests/config/config.ts)) for:

- Test user credentials
- Environment URLs
- Test data
- Reusable test settings

### Test Utilities

Helper functions ([utils/testUtils.ts](tests/utils/testUtils.ts)) for:

- Screenshot capture
- Common test operations
- Reusable assertions
- Test data management

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

### View Test Logs

```bash
# Check logs directory
ls -la logs/

# View specific log file
cat logs/TC-01-login-valid-2026-01-05.log
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
- **Test Case Documentation:** [TEST_CASES.md](TEST_CASES.md)

---

## Project Highlights

- ✅ **Page Object Model** in TypeScript for maintainable test code
- ✅ **Custom Fixtures** for reusable test setup
- ✅ **Advanced Logging** with file output and test tracking
- ✅ **Data-Driven Testing** for parameterized test execution
- ✅ **Comprehensive Coverage** across authentication, cart, and security
- ✅ **Screenshot & Video** capture on failures
- ✅ **Multiple Browsers** support (Chromium, Firefox, WebKit)

**Project:** Playwright Test Automation Suite  
**Technologies:** Playwright, TypeScript, JavaScript, Node.js

---
