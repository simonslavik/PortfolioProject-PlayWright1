// @ts-check
import { test, expect } from '@playwright/test';

test.describe('UI & Usability Tests', () => {
  test('TC-24: Verify error messages are readable', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');

    // Try to login without credentials
    await page.getByRole('button', { name: 'Login' }).click();

    // Error message is displayed
    const errorMessage = page.locator('[data-test="error"]');
    await expect(errorMessage).toBeVisible();

    // Verify error text is readable and clear
    const errorText = await errorMessage.textContent();
    expect(errorText).toBeTruthy();
    expect(errorText?.length).toBeGreaterThan(0);

    // Verify text is visible and not hidden
    await expect(errorMessage).toHaveCSS('visibility', 'visible');
  });

  test('TC-25: Verify buttons are clickable and responsive', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');

    // Check login button is visible and clickable
    const loginButton = page.getByRole('button', { name: 'Login' });
    await expect(loginButton).toBeVisible();
    await expect(loginButton).toBeEnabled();

    // Fill credentials
    await page.getByRole('textbox', { name: 'Username' }).fill('standard_user');
    await page.getByRole('textbox', { name: 'Password' }).fill('secret_sauce');

    // Click login button - should be responsive
    await loginButton.click();

    // Verify navigation occurred (button was responsive)
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');

    // Check that buttons on inventory page are clickable
    const addToCartButton = page.locator('button', { hasText: 'Add to cart' }).first();
    await expect(addToCartButton).toBeVisible();
    await expect(addToCartButton).toBeEnabled();

    // Click button and verify it responds
    await addToCartButton.click();
    const cartBadge = page.locator('.shopping_cart_badge');
    await expect(cartBadge).toHaveText('1');
  });
});
