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
});

