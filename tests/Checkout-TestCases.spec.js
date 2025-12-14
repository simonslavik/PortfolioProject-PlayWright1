// @ts-check
import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.getByRole('textbox', { name: 'Username' }).fill('standard_user');
  await page.getByRole('textbox', { name: 'Password' }).fill('secret_sauce');
  await page.getByRole('button', { name: 'Login' }).click();
  await page.goto('https://www.saucedemo.com/inventory.html');
  
  // Add products to cart for checkout tests
  const addButtons = page.locator('button', { hasText: 'Add to cart' });
  const count = await addButtons.count();
  for (let i = 0; i < Math.min(2, count); i++) {
    await addButtons.nth(i).click();
  }
});

test.describe('Checkout Test Cases', () => {
  test('TC-15: Proceed to checkout', async ({ page }) => {
    // Navigate to cart
    await page.locator('.shopping_cart_link').click();

    // Click checkout button
    await page.locator('button', { hasText: 'Checkout' }).click();

    // Checkout page opens
    await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-one.html');
    await expect(page.locator('.checkout_info')).toBeVisible();
  });

  test('TC-16: Checkout with valid user information', async ({ page }) => {
    // Navigate to cart
    await page.locator('.shopping_cart_link').click();

    // Click checkout button
    await page.locator('button', { hasText: 'Checkout' }).click();

    // Fill checkout form with valid information
    await page.getByRole('textbox', { name: 'First Name' }).fill('John');
    await page.getByRole('textbox', { name: 'Last Name' }).fill('Doe');
    await page.getByRole('textbox', { name: 'Zip/Postal Code' }).fill('12345');

    // Click continue button
    await page.locator('button', { hasText: 'Continue' }).click();

    // User proceeds to overview page
    await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-two.html');
    await expect(page.locator('.summary_info')).toBeVisible();
  });

  test('TC-17: Checkout with missing first name', async ({ page }) => {
    // Navigate to cart
    await page.locator('.shopping_cart_link').click();

    // Click checkout button
    await page.locator('button', { hasText: 'Checkout' }).click();

    // Fill checkout form without first name
    await page.getByRole('textbox', { name: 'Last Name' }).fill('Doe');
    await page.getByRole('textbox', { name: 'Zip/Postal Code' }).fill('12345');

    // Click continue button
    await page.locator('button', { hasText: 'Continue' }).click();

    // Validation error is displayed
    const errorMessage = page.locator('[data-test="error"]');
    await expect(errorMessage).toBeVisible();
    await expect(errorMessage).toContainText('First Name is required');
  });

  test('TC-18: Verify total price calculation', async ({ page }) => {
    // Navigate to cart
    await page.locator('.shopping_cart_link').click();

    // Get cart subtotal
    const cartSubtotal = await page.locator('.summary_subtotal_label').textContent();
    const subtotalMatch = cartSubtotal?.match(/[\d.]+/);
    const subtotal = subtotalMatch ? parseFloat(subtotalMatch[0]) : 0;

    // Proceed to checkout
    await page.locator('button', { hasText: 'Checkout' }).click();

    // Fill form and continue
    await page.getByRole('textbox', { name: 'First Name' }).fill('John');
    await page.getByRole('textbox', { name: 'Last Name' }).fill('Doe');
    await page.getByRole('textbox', { name: 'Zip/Postal Code' }).fill('12345');
    await page.locator('button', { hasText: 'Continue' }).click();

    // Get the total on overview page
    const totalLabel = await page.locator('.summary_total_label').textContent();
    const totalMatch = totalLabel?.match(/[\d.]+/);
    const total = totalMatch ? parseFloat(totalMatch[0]) : 0;

    // Get tax from overview
    const taxLabel = await page.locator('.summary_tax_label').textContent();
    const taxMatch = taxLabel?.match(/[\d.]+/);
    const tax = taxMatch ? parseFloat(taxMatch[0]) : 0;

    // Verify: Total = Subtotal + Tax
    expect(total).toBeCloseTo(subtotal + tax, 1);
  });

  test('TC-19: Complete checkout process', async ({ page }) => {
    // Navigate to cart
    await page.locator('.shopping_cart_link').click();

    // Click checkout
    await page.locator('button', { hasText: 'Checkout' }).click();

    // Fill checkout form
    await page.getByRole('textbox', { name: 'First Name' }).fill('John');
    await page.getByRole('textbox', { name: 'Last Name' }).fill('Doe');
    await page.getByRole('textbox', { name: 'Zip/Postal Code' }).fill('12345');

    // Continue to overview
    await page.locator('button', { hasText: 'Continue' }).click();

    // Click finish button to complete checkout
    await page.locator('button', { hasText: 'Finish' }).click();

    // Order confirmation page displayed
    await expect(page).toHaveURL('https://www.saucedemo.com/checkout-complete.html');
    await expect(page.locator('.complete-header')).toBeVisible();
    await expect(page.getByText('Thank you for your order')).toBeVisible();
  });
});
