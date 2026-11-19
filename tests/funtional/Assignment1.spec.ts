import { test, expect } from "@playwright/test";

test.describe("Assignment1", () => {
  test("Complete the checkout process", async ({ page }) => {
    await page.goto("https://www.saucedemo.com/");
    await page.locator('[data-test="username"]').click();
    await page.locator('[data-test="username"]').fill("standard_user");
    await page.locator('[data-test="password"]').click();
    await page.locator('[data-test="password"]').fill("secret_sauce");
    await page.locator('[data-test="login-button"]').click();
    await expect(page.locator('[data-test="title"]')).toContainText("Products");
    await expect(page.locator('[data-test="item-4-img-link"]')).toBeVisible();
    await page.locator('[data-test="item-4-img-link"]').click();
    await expect(page.locator('[data-test="back-to-products"]')).toContainText(
      "Back to products",
    );
    await expect(
      page.locator('[data-test="shopping-cart-link"]'),
    ).toBeVisible();
    await page.locator('[data-test="add-to-cart"]').click();
    await expect(page.locator('[data-test="remove"]')).toContainText('Remove');
    await page.locator('[data-test="shopping-cart-link"]').click();
    await expect(page.locator('[data-test="title"]')).toContainText(
      "Your Cart",
    );
    await expect(page.locator('[data-test="inventory-item"]')).toBeVisible();
    await expect(page.locator('[data-test="cart-list"]')).toBeVisible();
    await expect(page.locator('[data-test="checkout"]')).toContainText(
      "Checkout",
    );
    await page.locator('[data-test="checkout"]').click();
    await expect(page.locator('[data-test="title"]')).toContainText(
      "Checkout: Your Information",
    );
    await page.locator('[data-test="firstName"]').click();
    await page.locator('[data-test="firstName"]').fill("Harry");
    await page.locator('[data-test="lastName"]').click();
    await page.locator('[data-test="lastName"]').fill("Suri");
    await page.locator('[data-test="postalCode"]').click();
    await page.locator('[data-test="postalCode"]').fill("759122");
    await expect(page.locator('[data-test="continue"]')).toContainText(
      "Continue",
    );
    await page.locator('[data-test="continue"]').click();
    await expect(page.locator('[data-test="title"]')).toContainText(
      "Checkout: Overview",
    );
    await expect(page.locator('[data-test="finish"]')).toContainText("Finish");
    await page.locator('[data-test="finish"]').click();
    await expect(page.locator('[data-test="secondary-header"]')).toContainText(
      "Checkout: Complete!",
    );
    await expect(page.locator('[data-test="complete-header"]')).toContainText(
      "Thank you for your order!",
    );
  });
});
