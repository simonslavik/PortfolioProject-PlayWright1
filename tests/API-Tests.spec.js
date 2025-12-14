// @ts-check
import { test, expect } from '@playwright/test';

test.describe('Sauce Demo API Tests', () => {
  const API_BASE_URL = 'https://www.saucedemo.com/api';

  test('API - Get products list', async ({ request }) => {
    // This is a simulated API test - SauceDemo doesn't have a real API
    // In a real project, this would test actual API endpoints
    const response = await request.get('https://www.saucedemo.com/inventory.html');
    
    expect(response.status()).toBe(200);
  });

  test('API - Verify login endpoint response', async ({ request }) => {
    // Test page structure validation (simulating API response)
    const response = await request.get('https://www.saucedemo.com/');
    
    expect(response.status()).toBe(200);
    const content = await response.text();
    expect(content).toContain('Swag Labs');
  });

  test('API - Verify checkout API call', async ({ request }) => {
    // Validate checkout page loads properly
    const response = await request.get('https://www.saucedemo.com/checkout-step-one.html');
    
    expect(response.status()).toBe(200);
  });

  test('Combined UI + API test - Login and verify inventory', async ({ page, request }) => {
    // Login via UI
    await page.goto('https://www.saucedemo.com/');
    await page.getByRole('textbox', { name: 'Username' }).fill('standard_user');
    await page.getByRole('textbox', { name: 'Password' }).fill('secret_sauce');
    await page.getByRole('button', { name: 'Login' }).click();
    
    // Wait for inventory page
    await page.waitForURL('https://www.saucedemo.com/inventory.html');
    
    // Verify inventory page loads via request
    const response = await request.get('https://www.saucedemo.com/inventory.html');
    expect(response.status()).toBe(200);
    
    // Verify UI shows products
    const products = page.locator('.inventory_item');
    await expect(products.first()).toBeVisible();
    const count = await products.count();
    expect(count).toBeGreaterThan(0);
  });
});
