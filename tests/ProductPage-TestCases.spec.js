// @ts-check
import { test, expect } from '@playwright/test';


test.beforeEach(async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.getByRole('textbox', { name: 'Username' }).fill('standard_user');
  await page.getByRole('textbox', { name: 'Password' }).fill('secret_sauce');
  await page.getByRole('button', { name: 'Login' }).click();
  await page.goto('https://www.saucedemo.com/inventory.html');
});


test.describe('Product Page Test Cases', () => {
  test('TC-06: Verify product list is displayed', async ({ page }) => {
    const products = page.locator('.inventory_item');
    await expect(products.first()).toBeVisible();
    const count = await products.count();
    expect(count).toBeGreaterThan(0);
    for (let i = 0; i < count; i++) {
      const product = products.nth(i);
      await expect(product.locator('.inventory_item_name')).toBeVisible();
      await expect(product.locator('.inventory_item_price')).toBeVisible();
      await expect(product.locator('img')).toBeVisible();
    }
  });

  test('TC-07: Add single product to cart', async ({ page }) => {
    await page.locator('button', { hasText: 'Add to cart' }).first().click();
    const cartBadge = page.locator('.shopping_cart_badge');
    await expect(cartBadge).toHaveText('1');
  });

  test('TC-08: Remove product from cart', async ({ page }) => {
    // Add and then remove
    const addBtn = page.locator('button', { hasText: 'Add to cart' }).first();
    await addBtn.click();
    const removeBtn = page.locator('button', { hasText: 'Remove' }).first();
    await removeBtn.click();
    const cartBadge = page.locator('.shopping_cart_badge');
    await expect(cartBadge).toHaveCount(0);
  });

  test('TC-09: Add multiple products to cart', async ({ page }) => {
    const addButtons = page.locator('button', { hasText: 'Add to cart' });
    const count = await addButtons.count();
    const itemsToAdd = Math.min(3, count);
    for (let i = 0; i < itemsToAdd; i++) {
      await addButtons.nth(i).click();
    }
    const cartBadge = page.locator('.shopping_cart_badge');
    await expect(cartBadge).toHaveText(itemsToAdd.toString());
  });

  test('TC-10: Verify product sorting by price (low to high)', async ({ page }) => {
    await page.locator('.product_sort_container').selectOption('lohi');
    const prices = await page.locator('.inventory_item_price').allTextContents();
    const priceNumbers = prices.map(p => parseFloat(p.replace('$', '')));
    const sorted = [...priceNumbers].sort((a, b) => a - b);
    expect(priceNumbers).toEqual(sorted);
  });
});

