// @ts-check
import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.getByRole('textbox', { name: 'Username' }).fill('standard_user');
  await page.getByRole('textbox', { name: 'Password' }).fill('secret_sauce');
  await page.getByRole('button', { name: 'Login' }).click();
  await page.goto('https://www.saucedemo.com/inventory.html');
});

test.describe('Logout Test Cases', () => {
  test('TC-15: Logout from application', async ({ page }) => {
    // Click on menu button
    await page.locator('#react-burger-menu-btn').click();

    // Click logout button
    await page.locator('#logout_sidebar_link').click();

    // User is redirected to login page
    await expect(page).toHaveURL('https://www.saucedemo.com/');
    await expect(page.locator('.login_logo')).toBeVisible();
  });

  test('TC-16: Verify session ends after logout', async ({ page }) => {
    // Logout
    await page.locator('#react-burger-menu-btn').click();
    await page.locator('#logout_sidebar_link').click();

    // Verify user is at login page
    await expect(page).toHaveURL('https://www.saucedemo.com/');

    // Try to access product page directly
    await page.goto('https://www.saucedemo.com/inventory.html');

    // User is redirected to login page because session is ended
    await expect(page).toHaveURL('https://www.saucedemo.com/');
    await expect(page.locator('.login_logo')).toBeVisible();
  });
});
