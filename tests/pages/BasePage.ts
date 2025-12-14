// @ts-check
import { Page } from '@playwright/test';

export class LoginPage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto('https://www.saucedemo.com/');
  }

  async fillUsername(username: string) {
    await this.page.getByRole('textbox', { name: 'Username' }).fill(username);
  }

  async fillPassword(password: string) {
    await this.page.getByRole('textbox', { name: 'Password' }).fill(password);
  }

  async clickLogin() {
    await this.page.getByRole('button', { name: 'Login' }).click();
  }

  async getErrorMessage() {
    return await this.page.locator('[data-test="error"]').textContent();
  }

  async login(username: string, password: string) {
    await this.fillUsername(username);
    await this.fillPassword(password);
    await this.clickLogin();
  }
}

export class InventoryPage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto('https://www.saucedemo.com/inventory.html');
  }

  async getProductCount() {
    return await this.page.locator('.inventory_item').count();
  }

  async addProductToCart(index: number = 0) {
    await this.page.locator('button', { hasText: 'Add to cart' }).nth(index).click();
  }

  async removeProductFromCart(index: number = 0) {
    await this.page.locator('button', { hasText: 'Remove' }).nth(index).click();
  }

  async getCartBadgeCount() {
    const badge = this.page.locator('.shopping_cart_badge');
    const count = await badge.count();
    if (count === 0) return 0;
    return parseInt(await badge.textContent() || '0');
  }

  async goToCart() {
    await this.page.locator('.shopping_cart_link').click();
  }

  async sortByPrice(option: 'lohi' | 'hilo') {
    await this.page.locator('.product_sort_container').selectOption(option);
  }

  async getProductPrices() {
    const prices = await this.page.locator('.inventory_item_price').allTextContents();
    return prices.map(p => parseFloat(p.replace('$', '')));
  }

  async openMenu() {
    await this.page.locator('#react-burger-menu-btn').click();
  }

  async logout() {
    await this.openMenu();
    await this.page.locator('#logout_sidebar_link').click();
  }
}

export class CartPage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto('https://www.saucedemo.com/cart.html');
  }

  async getCartItemCount() {
    return await this.page.locator('.cart_item').count();
  }

  async removeItem(index: number = 0) {
    await this.page.locator('button', { hasText: 'Remove' }).nth(index).click();
  }

  async continueShopping() {
    await this.page.locator('button', { hasText: 'Continue Shopping' }).click();
  }

  async checkout() {
    await this.page.locator('button', { hasText: 'Checkout' }).click();
  }
}

export class CheckoutPage {
  constructor(private page: Page) {}

  async fillFirstName(firstName: string) {
    await this.page.getByRole('textbox', { name: 'First Name' }).fill(firstName);
  }

  async fillLastName(lastName: string) {
    await this.page.getByRole('textbox', { name: 'Last Name' }).fill(lastName);
  }

  async fillZipCode(zip: string) {
    await this.page.getByRole('textbox', { name: 'Zip/Postal Code' }).fill(zip);
  }

  async clickContinue() {
    await this.page.locator('button', { hasText: 'Continue' }).click();
  }

  async fillCheckoutInfo(firstName: string, lastName: string, zip: string) {
    await this.fillFirstName(firstName);
    await this.fillLastName(lastName);
    await this.fillZipCode(zip);
  }

  async getErrorMessage() {
    return await this.page.locator('[data-test="error"]').textContent();
  }
}

export class CheckoutOverviewPage {
  constructor(private page: Page) {}

  async getSubtotal() {
    const text = await this.page.locator('.summary_subtotal_label').textContent();
    const match = text?.match(/[\d.]+/);
    return match ? parseFloat(match[0]) : 0;
  }

  async getTax() {
    const text = await this.page.locator('.summary_tax_label').textContent();
    const match = text?.match(/[\d.]+/);
    return match ? parseFloat(match[0]) : 0;
  }

  async getTotal() {
    const text = await this.page.locator('.summary_total_label').textContent();
    const match = text?.match(/[\d.]+/);
    return match ? parseFloat(match[0]) : 0;
  }

  async finish() {
    await this.page.locator('button', { hasText: 'Finish' }).click();
  }
}

export class CheckoutCompletePage {
  constructor(private page: Page) {}

  async getSuccessMessage() {
    return await this.page.locator('.complete-header').textContent();
  }

  async isOrderComplete() {
    return await this.page.getByText('Thank you for your order').isVisible();
  }
}
