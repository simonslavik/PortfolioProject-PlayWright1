// @ts-check
import { test, expect } from './fixtures-with-logging';
import { createLogger } from './utils/logger';
import TestUtils from './utils/testUtils';
import config from './config/config';

test.describe('Login Tests with Logging', () => {
  test('TC-01: Login with valid credentials - With Logging', async ({ 
    page, 
    loginPage, 
    logger 
  }) => {
    const testLogger = createLogger('TC-01-login-valid');
    testLogger.testStart('Login with valid credentials');

    try {
      testLogger.step(1, 'Navigating to login page');
      await loginPage.goto();

      testLogger.step(2, 'Entering valid username');
      await loginPage.fillUsername(config.testUser.validUsername);
      testLogger.info('Username entered', { username: config.testUser.validUsername });

      testLogger.step(3, 'Entering password');
      await loginPage.fillPassword(config.testUser.validPassword);
      testLogger.info('Password entered');

      testLogger.step(4, 'Clicking login button');
      await loginPage.clickLogin();

      testLogger.step(5, 'Verifying redirect to inventory page');
      await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
      testLogger.success('User successfully logged in and redirected');

      testLogger.testEnd('TC-01-login-valid', 'PASSED');
    } catch (error) {
      testLogger.error('Test failed', error);
      await TestUtils.takeScreenshot(page, `TC-01-failure-${Date.now()}`);
      testLogger.info('Screenshot captured');
      testLogger.testEnd('TC-01-login-valid', 'FAILED');
      throw error;
    }
  });

  test('TC-02: Login with invalid username - With Logging', async ({ 
    page, 
    loginPage, 
    logger 
  }) => {
    const testLogger = createLogger('TC-02-login-invalid');
    testLogger.testStart('Login with invalid username');

    try {
      testLogger.step(1, 'Navigating to login page');
      await loginPage.goto();

      testLogger.step(2, 'Entering invalid username');
      await loginPage.fillUsername('invalid_user');
      testLogger.warn('Using invalid username for negative test');

      testLogger.step(3, 'Entering password');
      await loginPage.fillPassword(config.testUser.validPassword);

      testLogger.step(4, 'Clicking login button');
      await loginPage.clickLogin();

      testLogger.step(5, 'Verifying error message appears');
      const errorMessage = await loginPage.getErrorMessage();
      testLogger.info('Error message received', { message: errorMessage });
      await expect(page.locator('[data-test="error"]')).toBeVisible();

      testLogger.success('Error validation passed');
      testLogger.testEnd('TC-02-login-invalid', 'PASSED');
    } catch (error) {
      testLogger.error('Test failed', error);
      await TestUtils.takeScreenshot(page, `TC-02-failure-${Date.now()}`);
      testLogger.testEnd('TC-02-login-invalid', 'FAILED');
      throw error;
    }
  });

  test('TC-Checkout: Complete purchase with logging', async ({ 
    page, 
    loginPage, 
    logger 
  }) => {
    const testLogger = createLogger('TC-Checkout-Complete');
    testLogger.testStart('Complete checkout process');

    try {
      testLogger.step(1, 'Logging in');
      await loginPage.goto();
      await loginPage.login(
        config.testUser.validUsername,
        config.testUser.validPassword
      );
      testLogger.success('Login completed');

      testLogger.step(2, 'Adding products to cart');
      await page.goto(`${config.baseUrl}/inventory.html`);
      const addButtons = page.locator('button', { hasText: 'Add to cart' });
      const count = await addButtons.count();
      const itemsToAdd = Math.min(2, count);
      
      for (let i = 0; i < itemsToAdd; i++) {
        await addButtons.nth(i).click();
        testLogger.info(`Product ${i + 1} added to cart`);
      }
      testLogger.success(`${itemsToAdd} products added to cart`);

      testLogger.step(3, 'Navigating to cart');
      await page.locator('.shopping_cart_link').click();
      testLogger.info('Cart page loaded');

      testLogger.step(4, 'Proceeding to checkout');
      await page.locator('button', { hasText: 'Checkout' }).click();
      testLogger.info('Checkout page loaded');

      testLogger.step(5, 'Filling checkout information');
      await page.getByRole('textbox', { name: 'First Name' }).fill(config.checkoutData.firstName);
      await page.getByRole('textbox', { name: 'Last Name' }).fill(config.checkoutData.lastName);
      await page.getByRole('textbox', { name: 'Zip/Postal Code' }).fill(config.checkoutData.zipCode);
      testLogger.info('Checkout form filled', { 
        firstName: config.checkoutData.firstName,
        lastName: config.checkoutData.lastName,
        zipCode: config.checkoutData.zipCode,
      });

      testLogger.step(6, 'Proceeding to checkout overview');
      await page.locator('button', { hasText: 'Continue' }).click();
      await page.waitForURL('**/checkout-step-two.html');
      testLogger.success('Checkout overview page reached');

      testLogger.step(7, 'Completing purchase');
      await page.locator('button', { hasText: 'Finish' }).click();
      await page.waitForURL('**/checkout-complete.html');
      testLogger.success('Purchase completed successfully');

      testLogger.testEnd('TC-Checkout-Complete', 'PASSED');
    } catch (error) {
      testLogger.error('Checkout failed', error);
      await TestUtils.takeScreenshot(page, `TC-Checkout-failure-${Date.now()}`);
      testLogger.info(`Screenshot saved: TC-Checkout-failure-${Date.now()}`);
      testLogger.testEnd('TC-Checkout-Complete', 'FAILED');
      throw error;
    }
  });
});
