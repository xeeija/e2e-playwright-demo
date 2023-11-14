import { expect, test } from "@playwright/test";

test.describe('Mocking an API call', () => {
  test('should mock a fruit and dont call the API', async ({ page }) => {
    // Mock the api call before navigating
    await page.route('*/**/api/v1/fruits', async (route) => {
      const json = [{ name: 'Strawberry', id: 21 }];
      await route.fulfill({ json });
    });

    // Go to the page
    await page.goto('https://demo.playwright.dev/api-mocking');

    // Assert that the Strawberry fruit is visible
    await expect(page.getByText('Strawberry')).toBeVisible();
  });
});

test.describe('Intercepting the request and modifying it', () => {
  test('should get the response from the API and add a new fruit', async ({ page }) => {
    // Get the response and add to it
    await page.route('*/**/api/v1/fruits', async (route) => {
      const response = await route.fetch();
      const json = await response.json();

      json.push({ name: 'Pitaya', id: 100 });
      // Fulfill using the original response, and modify it with the new JSON object
      await route.fulfill({ response, json });
    });

    // Go to the page
    await page.goto('https://demo.playwright.dev/api-mocking');

    // Assert that the new fruit is visible
    await expect(page.getByText('Pitaya', { exact: true })).toBeVisible();
  });
});
