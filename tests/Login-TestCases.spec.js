
// @ts-check
import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
});

test.describe('Login Test Cases', () => {
  test('TC-01 - Login with valid credentials', async ({ page }) => {
    // Enter valid username
    await page.getByRole('textbox', { name: 'Username' }).fill('standard_user');

    // Enter valid password
    await page.getByRole('textbox', { name: 'Password' }).fill('secret_sauce');

    // Click login 
    await page.getByRole('button', { name: 'Login' }).click();

    // User is redirected to Products page
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
  });


  test('TC-02 - Login with invalid username', async ({ page }) => {
    // Enter invalid username
    await page.getByRole('textbox', { name: 'Username' }).fill('invalid_user');

    // Enter valid password
    await page.getByRole('textbox', { name: 'Password' }).fill('secret_sauce');

    // Click login 
    await page.getByRole('button', { name: 'Login' }).click();

    // Error message is displayed
    await expect(page.getByText('Epic sadface: Username and password do not match any user in this service')).toBeVisible();
  });


  test('TC-03 - Login with invalid password', async ({ page }) => {
    // Enter valid username
    await page.getByRole('textbox', { name: 'Username' }).fill('standard_user');

    // Enter invalid password
    await page.getByRole('textbox', { name: 'Password' }).fill('wrong_password');

    // Click login 
    await page.getByRole('button', { name: 'Login' }).click();

    // Error message is displayed
    await expect(page.getByText('Epic sadface: Username and password do not match any user in this service')).toBeVisible();
  });


  test('TC-04 - Login with empty credentials', async ({ page }) => {
    // Leave username and password fields empty

    // Click login 
    await page.getByRole('button', { name: 'Login' }).click();

    // Error message is displayed
    await expect(page.getByText('Epic sadface: Username is required')).toBeVisible();
  });

  test('TC-05 - Login with locked out user', async ({ page }) => {
    // Enter locked out username
    await page.getByRole('textbox', { name: 'Username' }).fill('locked_out_user');

    // Enter valid password
    await page.getByRole('textbox', { name: 'Password' }).fill('secret_sauce');

    // Click login 
    await page.getByRole('button', { name: 'Login' }).click();

    // Error message is displayed
    await expect(page.getByText('Epic sadface: Sorry, this user has been locked out.')).toBeVisible();
  });
});