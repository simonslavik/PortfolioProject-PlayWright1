// @ts-check
import { Page } from '@playwright/test';

/**
 * Test utility functions for common operations
 */
export class TestUtils {
  /**
   * Wait for element and click with retry logic
   */
  static async clickWithRetry(page: Page, selector: string, maxRetries: number = 3): Promise<void> {
    for (let i = 0; i < maxRetries; i++) {
      try {
        const element = page.locator(selector);
        await element.waitFor({ state: 'visible', timeout: 5000 });
        await element.click();
        return;
      } catch (error) {
        if (i === maxRetries - 1) throw error;
        await page.waitForTimeout(500);
      }
    }
  }

  /**
   * Wait for element and fill with retry logic
   */
  static async fillWithRetry(
    page: Page,
    selector: string,
    value: string,
    maxRetries: number = 3
  ): Promise<void> {
    for (let i = 0; i < maxRetries; i++) {
      try {
        const element = page.locator(selector);
        await element.waitFor({ state: 'visible', timeout: 5000 });
        await element.fill(value);
        return;
      } catch (error) {
        if (i === maxRetries - 1) throw error;
        await page.waitForTimeout(500);
      }
    }
  }

  /**
   * Wait for element to be visible with custom timeout
   */
  static async waitForElement(page: Page, selector: string, timeout: number = 10000): Promise<void> {
    await page.locator(selector).waitFor({ state: 'visible', timeout });
  }

  /**
   * Get all text content from elements
   */
  static async getAllTextContent(page: Page, selector: string): Promise<string[]> {
    return await page.locator(selector).allTextContents();
  }

  /**
   * Scroll element into view
   */
  static async scrollIntoView(page: Page, selector: string): Promise<void> {
    await page.locator(selector).scrollIntoViewIfNeeded();
  }

  /**
   * Take screenshot with descriptive name
   */
  static async takeScreenshot(page: Page, fileName: string): Promise<void> {
    const screenshotsDir = 'screenshots';
    if (!require('fs').existsSync(screenshotsDir)) {
      require('fs').mkdirSync(screenshotsDir, { recursive: true });
    }
    await page.screenshot({ path: `${screenshotsDir}/${fileName}.png` });
  }

  /**
   * Accept or dismiss dialog
   */
  static async handleDialog(page: Page, accept: boolean = true): Promise<void> {
    page.on('dialog', async (dialog) => {
      if (accept) {
        await dialog.accept();
      } else {
        await dialog.dismiss();
      }
    });
  }

  /**
   * Extract numeric value from text
   */
  static extractNumber(text: string): number {
    const match = text.match(/[\d.]+/);
    return match ? parseFloat(match[0]) : 0;
  }

  /**
   * Compare two arrays for equality
   */
  static areArraysEqual(arr1: any[], arr2: any[]): boolean {
    return JSON.stringify(arr1) === JSON.stringify(arr2);
  }

  /**
   * Wait for API response
   */
  static async waitForApiResponse(page: Page, urlPattern: string, timeout: number = 10000): Promise<any> {
    const response = await page.waitForResponse(
      (response) => response.url().includes(urlPattern),
      { timeout }
    );
    return await response.json();
  }

  /**
   * Get cookie value
   */
  static async getCookie(page: Page, cookieName: string): Promise<string | null> {
    const cookies = await page.context().cookies();
    const cookie = cookies.find((c) => c.name === cookieName);
    return cookie ? cookie.value : null;
  }

  /**
   * Clear all cookies
   */
  static async clearCookies(page: Page): Promise<void> {
    await page.context().clearCookies();
  }
}

export default TestUtils;
