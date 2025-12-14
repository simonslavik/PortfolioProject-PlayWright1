// @ts-check
import { test, expect } from '@playwright/test';

test.describe('Security & Session Tests', () => {
  test('TC-22: Access product page without login', async ({ page }) => {
    // Try to access product page directly without logging in
    await page.goto('https://www.saucedemo.com/inventory.html');

    // Should be redirected to login page
    await expect(page).toHaveURL('https://www.saucedemo.com/');
    await expect(page.locator('.login_logo')).toBeVisible();
  });

  test('TC-23: Refresh page after logout', async ({ page }) => {
    // Login first
    await page.goto('https://www.saucedemo.com/');
    await page.getByRole('textbox', { name: 'Username' }).fill('standard_user');
    await page.getByRole('textbox', { name: 'Password' }).fill('secret_sauce');
    await page.getByRole('button', { name: 'Login' }).click();
    await page.goto('https://www.saucedemo.com/inventory.html');

    // Logout
    await page.locator('#react-burger-menu-btn').click();
    await page.locator('#logout_sidebar_link').click();

    // Refresh page after logout
    await page.reload();

    // User remains logged out and is on login page
    await expect(page).toHaveURL('https://www.saucedemo.com/');
    await expect(page.locator('.login_logo')).toBeVisible();
  });
});
