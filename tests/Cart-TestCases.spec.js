// @ts-check
import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.getByRole('textbox', { name: 'Username' }).fill('standard_user');
  await page.getByRole('textbox', { name: 'Password' }).fill('secret_sauce');
  await page.getByRole('button', { name: 'Login' }).click();
  await page.goto('https://www.saucedemo.com/inventory.html');
  // Add some products to cart before cart tests
  await page.locator('button', { hasText: 'Add to cart' }).first().click();
  await page.locator('button', { hasText: 'Add to cart' }).nth(1).click();
});

test.describe('Cart Test Cases', () => {

  test('TC-11: Navigate to cart page', async ({ page }) => {
    // Click on the shopping cart icon
    await page.locator('.shopping_cart_link').click();

    // Cart page loads successfully
    await expect(page).toHaveURL('https://www.saucedemo.com/cart.html');
    await expect(page.locator('.cart_list')).toBeVisible();
  });

  test('TC-12: Verify selected items appear in cart', async ({ page }) => {
    // Navigate to cart page
    await page.locator('.shopping_cart_link').click();

    // Correct products and prices displayed
    const cartItems = page.locator('.cart_item');
    const itemCount = await cartItems.count();
    expect(itemCount).toBeGreaterThan(0);

    // Verify each item has name and price
    for (let i = 0; i < itemCount; i++) {
      const item = cartItems.nth(i);
      await expect(item.locator('.inventory_item_name')).toBeVisible();
      await expect(item.locator('.inventory_item_price')).toBeVisible();
    }
  });

  test('TC-13: Remove item from cart page', async ({ page }) => {
    // Navigate to cart page
    await page.locator('.shopping_cart_link').click();

    // Get initial item count
    const cartItems = page.locator('.cart_item');
    const initialCount = await cartItems.count();

    // Remove first item
    await page.locator('button', { hasText: 'Remove' }).first().click();

    // Item is removed successfully
    const updatedItems = page.locator('.cart_item');
    const updatedCount = await updatedItems.count();
    expect(updatedCount).toBe(initialCount - 1);
  });

  test('TC-14: Continue shopping from cart', async ({ page }) => {
    // Navigate to cart page
    await page.locator('.shopping_cart_link').click();

    // Click continue shopping button
    await page.locator('button', { hasText: 'Continue Shopping' }).click();

    // User returns to products page
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
    await expect(page.locator('.inventory_list')).toBeVisible();
  });
});