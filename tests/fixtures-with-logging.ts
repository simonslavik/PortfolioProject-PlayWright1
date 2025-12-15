// @ts-check
import { test as base, expect } from '@playwright/test';
import { Logger, createLogger } from './utils/logger';
import { LoginPage, InventoryPage, CartPage, CheckoutPage } from './pages/BasePage';
import config from './config/config';

export type TestFixtures = {
  loginPage: LoginPage;
  inventoryPage: InventoryPage;
  cartPage: CartPage;
  checkoutPage: CheckoutPage;
  authenticatedPage: any;
  logger: Logger;
};

export const test = base.extend<TestFixtures>({
  logger: async ({ }, use) => {
    const logger = createLogger('test');
    await use(logger);
  },

  loginPage: async ({ page, logger }, use) => {
    const loginPage = new LoginPage(page);
    logger.info('LoginPage initialized');
    await use(loginPage);
  },

  inventoryPage: async ({ page, logger }, use) => {
    const inventoryPage = new InventoryPage(page);
    logger.info('InventoryPage initialized');
    await use(inventoryPage);
  },

  cartPage: async ({ page, logger }, use) => {
    const cartPage = new CartPage(page);
    logger.info('CartPage initialized');
    await use(cartPage);
  },

  checkoutPage: async ({ page, logger }, use) => {
    const checkoutPage = new CheckoutPage(page);
    logger.info('CheckoutPage initialized');
    await use(checkoutPage);
  },

  authenticatedPage: async ({ page, logger }, use) => {
    try {
      logger.testStart('Authenticated Session');
      logger.step(1, 'Navigating to login page');
      const loginPage = new LoginPage(page);
      await loginPage.goto();

      logger.step(2, 'Logging in with valid credentials');
      await loginPage.login(
        config.testUser.validUsername,
        config.testUser.validPassword
      );

      logger.step(3, 'Verifying authentication success');
      await page.goto(`${config.baseUrl}/inventory.html`);
      logger.success('Authentication successful');
      
      await use(page);
    } catch (error) {
      logger.error('Authentication failed', error);
      throw error;
    }
  },
});

export { expect };
