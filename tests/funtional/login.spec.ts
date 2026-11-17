import { test, expect } from "@playwright/test";


test.describe("Login Functionality", () => {
  test.beforeEach("Go to Login page", async ({ page }) => {
    //1. Launch URL
    page.goto("https://katalon-demo-cura.herokuapp.com/");
    await expect(page).toHaveTitle("CURA Healthcare Service");
    await expect(page.locator("//h1")).toHaveText("CURA Healthcare Service");

    //2. Click on Make Appointment
    await page.getByRole("link", { name: "Make Appointment" }).click();
    await expect(
      page.getByText("Please login to make appointment"),
    ).toBeVisible();
  });


  test("Login to the application", async ({ page }) => {

    // Successful Login
    await page.getByLabel("Username").fill("John Doe");
    await page.getByLabel("Password").fill("ThisIsNotAPassword");
    await page.getByRole("button", { name: "Login" }).click();

    //  Assert the text
    await expect(page.locator("//h2")).toContainText("Make Appointment");
  });

  test("Login with incorrect credentials", async ({ page }) => {
    // Unsuccessful Login
    await page.getByLabel("Username").fill("John Smith");
    await page.getByLabel("Password").fill("ThisIsNotAPassword");
    await page.getByRole("button", { name: "Login" }).click();

    //  Assert a Text
    await expect(page.locator("#login")).toContainText(
      "Login failed! Please ensure the username and password are valid.",
    );
  });
});

