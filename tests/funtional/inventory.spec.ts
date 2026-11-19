import { test, expect } from "@playwright/test";

/**
 * Scenario:
 * 1. Login to the application
 * 2. Get a list of products with its price
 * 3. Assert that all the products have non-zero price
 */

test.describe("Inventory", () => {
  test.beforeEach("Login with Valid Credentials", async ({ page }) => {
    await page.goto("https://www.saucedemo.com/");
    await page.locator('[data-test="username"]').click();
    await page.locator('[data-test="username"]').fill("standard_user");
    await page.locator('[data-test="password"]').click();
    await page.locator('[data-test="password"]').fill("secret_sauce");
    await page.locator('[data-test="login-button"]').click();

    await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");
    await expect(page).toHaveURL(/.*\/inventory/);
  });


  test("Should confirm all the prices are non-zero", async ({ page }) => {

    //Get a list of products
    let productslist = page.locator(".inventory_item");
    await expect(productslist).toHaveCount(6);

    //get product names and prices
    let products=await productslist.count();

    let priceArr=[];
    for (let i = 0; i < products; i++) {
        let element = productslist.nth(i);
        let productName = await element.locator(".inventory_item_name").innerText();
        let productPrice = await element.locator(".inventory_item_price").innerText();
        priceArr.push(productPrice);
        console.log(`Product Name: ${productName} and Price: ${productPrice}`);

    }
    console.log("Price Array: ", priceArr);

    let cleanedPrices = priceArr.map((item) => parseFloat(item.replaceAll("$", "") ));
    console.log("Cleaned Price Array: ", cleanedPrices);

    let invalidPrices = cleanedPrices.filter((item) => (item<=0));

    if(invalidPrices.length>0){
        console.log(`ERROR: Zero price values found, ${invalidPrices}`);
    }else{
        console.log("All the products have non-zero price");
    }

    expect (invalidPrices.length).toBe(0);
  });

});
