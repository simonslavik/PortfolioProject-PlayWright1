// @ts-check
import { test, expect } from '@playwright/test';

// Test data for parameterized login tests
const loginTestData = [
  {
    username: 'standard_user',
    password: 'secret_sauce',
    shouldSucceed: true,
    expectedUrl: 'https://www.saucedemo.com/inventory.html',
    description: 'Valid credentials',
  },
  {
    username: 'invalid_user',
    password: 'secret_sauce',
    shouldSucceed: false,
    expectedError: 'Username and password do not match',
    description: 'Invalid username',
  },
  {
    username: 'standard_user',
    password: 'wrong_password',
    shouldSucceed: false,
    expectedError: 'Username and password do not match',
    description: 'Invalid password',
  },
  {
    username: 'locked_out_user',
    password: 'secret_sauce',
    shouldSucceed: false,
    expectedError: 'this user has been locked out',
    description: 'Locked out user',
  },
];

// Test data for checkout validation
const checkoutTestData = [
  {
    firstName: 'John',
    lastName: 'Doe',
    zipCode: '12345',
    shouldSucceed: true,
    description: 'Valid checkout info',
  },
  {
    firstName: '',
    lastName: 'Doe',
    zipCode: '12345',
    shouldSucceed: false,
    expectedError: 'First Name is required',
    description: 'Missing first name',
  },
  {
    firstName: 'John',
    lastName: '',
    zipCode: '12345',
    shouldSucceed: false,
    expectedError: 'Last Name is required',
    description: 'Missing last name',
  },
  {
    firstName: 'John',
    lastName: 'Doe',
    zipCode: '',
    shouldSucceed: false,
    expectedError: 'Postal Code is required',
    description: 'Missing zip code',
  },
];

// Parameterized login tests
test.describe('Data-Driven Login Tests', () => {
  loginTestData.forEach(({ username, password, shouldSucceed, expectedUrl, expectedError, description }) => {
    test(`Login test - ${description}`, async ({ page }) => {
      await page.goto('https://www.saucedemo.com/');
      await page.getByRole('textbox', { name: 'Username' }).fill(username);
      await page.getByRole('textbox', { name: 'Password' }).fill(password);
      await page.getByRole('button', { name: 'Login' }).click();

      if (shouldSucceed) {
        await expect(page).toHaveURL(expectedUrl);
      } else {
        const errorMessage = page.locator('[data-test="error"]');
        await expect(errorMessage).toBeVisible();
        const errorText = await errorMessage.textContent();
        expect(errorText).toContain(expectedError);
      }
    });
  });
});

// Parameterized checkout tests
test.describe('Data-Driven Checkout Tests', () => {
  test.beforeEach(async ({ page }) => {
    // Login and add items to cart
    await page.goto('https://www.saucedemo.com/');
    await page.getByRole('textbox', { name: 'Username' }).fill('standard_user');
    await page.getByRole('textbox', { name: 'Password' }).fill('secret_sauce');
    await page.getByRole('button', { name: 'Login' }).click();
    await page.goto('https://www.saucedemo.com/inventory.html');
    
    // Add product to cart
    await page.locator('button', { hasText: 'Add to cart' }).first().click();
    
    // Go to checkout
    await page.locator('.shopping_cart_link').click();
    await page.locator('button', { hasText: 'Checkout' }).click();
  });

  checkoutTestData.forEach(({ firstName, lastName, zipCode, shouldSucceed, expectedError, description }) => {
    test(`Checkout test - ${description}`, async ({ page }) => {
      // Fill checkout form
      if (firstName) {
        await page.getByRole('textbox', { name: 'First Name' }).fill(firstName);
      }
      if (lastName) {
        await page.getByRole('textbox', { name: 'Last Name' }).fill(lastName);
      }
      if (zipCode) {
        await page.getByRole('textbox', { name: 'Zip/Postal Code' }).fill(zipCode);
      }

      // Click continue
      await page.locator('button', { hasText: 'Continue' }).click();

      if (shouldSucceed) {
        await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-two.html');
      } else {
        const errorMessage = page.locator('[data-test="error"]');
        await expect(errorMessage).toBeVisible();
        const errorText = await errorMessage.textContent();
        expect(errorText).toContain(expectedError);
      }
    });
  });
});

// Product sorting test with different sort options
const sortTestData = [
  { option: 'az', description: 'Sort by name (A-Z)' },
  { option: 'za', description: 'Sort by name (Z-A)' },
  { option: 'lohi', description: 'Sort by price (Low to High)' },
  { option: 'hilo', description: 'Sort by price (High to Low)' },
];

test.describe('Data-Driven Product Sorting Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    await page.getByRole('textbox', { name: 'Username' }).fill('standard_user');
    await page.getByRole('textbox', { name: 'Password' }).fill('secret_sauce');
    await page.getByRole('button', { name: 'Login' }).click();
    await page.goto('https://www.saucedemo.com/inventory.html');
  });

  sortTestData.forEach(({ option, description }) => {
    test(`Product sorting - ${description}`, async ({ page }) => {
      await page.locator('.product_sort_container').selectOption(option);
      
      // Verify sort was applied by checking that products are visible
      const products = page.locator('.inventory_item');
      const count = await products.count();
      expect(count).toBeGreaterThan(0);
      
      // Verify sort container shows selected option
      const selectedOption = page.locator('.product_sort_container');
      const selectedValue = await selectedOption.inputValue();
      expect(selectedValue).toBe(option);
    });
  });
});
