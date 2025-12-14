// @ts-check
import { test, expect } from '@playwright/test';

test.describe('Visual Regression Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    await page.getByRole('textbox', { name: 'Username' }).fill('standard_user');
    await page.getByRole('textbox', { name: 'Password' }).fill('secret_sauce');
    await page.getByRole('button', { name: 'Login' }).click();
  });

  test('Visual - Login page layout', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    await expect(page).toHaveScreenshot('login-page.png', {
      mask: [page.locator('input[data-test="username"]')], // Mask sensitive fields if needed
      maxDiffPixels: 100,
    });
  });

  test('Visual - Inventory page layout', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/inventory.html');
    
    // Wait for products to load
    await page.locator('.inventory_item').first().waitFor();
    
    await expect(page).toHaveScreenshot('inventory-page.png', {
      maxDiffPixels: 100,
    });
  });

  test('Visual - Product card layout', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/inventory.html');
    
    // Take screenshot of first product card
    const productCard = page.locator('.inventory_item').first();
    await expect(productCard).toHaveScreenshot('product-card.png', {
      maxDiffPixels: 50,
    });
  });

  test('Visual - Cart page layout', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/inventory.html');
    
    // Add item to cart
    await page.locator('button', { hasText: 'Add to cart' }).first().click();
    
    // Go to cart
    await page.locator('.shopping_cart_link').click();
    
    await expect(page).toHaveScreenshot('cart-page.png', {
      maxDiffPixels: 100,
    });
  });

  test('Visual - Checkout page layout', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/inventory.html');
    
    // Add item and go to checkout
    await page.locator('button', { hasText: 'Add to cart' }).first().click();
    await page.locator('.shopping_cart_link').click();
    await page.locator('button', { hasText: 'Checkout' }).click();
    
    await expect(page).toHaveScreenshot('checkout-page.png', {
      maxDiffPixels: 100,
    });
  });

  test('Visual - Checkout overview page', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/inventory.html');
    
    // Add items and proceed to overview
    await page.locator('button', { hasText: 'Add to cart' }).first().click();
    await page.locator('.shopping_cart_link').click();
    await page.locator('button', { hasText: 'Checkout' }).click();
    
    // Fill form and continue
    await page.getByRole('textbox', { name: 'First Name' }).fill('John');
    await page.getByRole('textbox', { name: 'Last Name' }).fill('Doe');
    await page.getByRole('textbox', { name: 'Zip/Postal Code' }).fill('12345');
    await page.locator('button', { hasText: 'Continue' }).click();
    
    await expect(page).toHaveScreenshot('checkout-overview.png', {
      maxDiffPixels: 100,
    });
  });

  test('Visual - Error message styling', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    
    // Try to login without credentials to trigger error
    await page.getByRole('button', { name: 'Login' }).click();
    
    const errorContainer = page.locator('[data-test="error"]');
    await expect(errorContainer).toHaveScreenshot('error-message.png', {
      maxDiffPixels: 30,
    });
  });
});
