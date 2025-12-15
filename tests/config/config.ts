// @ts-check
import * as dotenv from 'dotenv';
import * as path from 'path';

// Load environment variables from .env file
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

export const config = {
  // Application
  baseUrl: process.env.BASE_URL || 'https://www.saucedemo.com',

  // Test Credentials
  testUser: {
    validUsername: process.env.TEST_USER_VALID_USERNAME || 'standard_user',
    validPassword: process.env.TEST_USER_VALID_PASSWORD || 'secret_sauce',
    lockedOut: process.env.TEST_USER_LOCKED_OUT || 'locked_out_user',
    performance: process.env.TEST_USER_PERFORMANCE || 'performance_glitch_user',
    problem: process.env.TEST_USER_PROBLEM || 'problem_user',
  },

  // Test Data
  checkoutData: {
    firstName: process.env.TEST_CHECKOUT_FIRST_NAME || 'John',
    lastName: process.env.TEST_CHECKOUT_LAST_NAME || 'Doe',
    zipCode: process.env.TEST_CHECKOUT_ZIP_CODE || '12345',
  },

  // Timeouts
  timeouts: {
    default: parseInt(process.env.DEFAULT_TIMEOUT || '30000'),
    navigation: parseInt(process.env.NAVIGATION_TIMEOUT || '30000'),
    element: parseInt(process.env.ELEMENT_TIMEOUT || '10000'),
  },

  // Browser Config
  browser: {
    headless: process.env.HEADLESS !== 'false',
    slowMo: parseInt(process.env.SLOW_MO || '0'),
  },

  // Reporting
  reporter: {
    type: process.env.REPORTER_TYPE || 'html',
    logLevel: process.env.LOG_LEVEL || 'info',
  },

  // CI/CD
  isCi: process.env.CI === 'true',
};

export default config;
