import { expect, test } from '@playwright/test';

test('should create a todo item', async ({ page }) => {
  // Recording...
  await page.goto('https://demo.playwright.dev/todomvc/');

  await page.getByPlaceholder('What needs to be done?').fill('Go shopping');
  await page.getByPlaceholder('What needs to be done?').press('Enter');
  const todoItem = await page.getByTestId('todo-title');

  expect(todoItem).toContainText("Go shopping");

});
