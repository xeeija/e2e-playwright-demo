import { expect, test } from "@playwright/test";

const TODO_ITEMS = [
  "Go to the food store",
  "Buy some food",
  "book a doctors appointment"
];

test.describe("New Todo", () => {
  test("should allow me to add todo items", async ({ page }) => {
    // The first action in a test is usually navigating to the page. This is done with page.goto
    await page.goto("https://demo.playwright.dev/todomvc");

    // create a new todo locator
    // Since the input has a placeholder, we can get the locator by placeholder
    const newTodo = page.getByPlaceholder("What needs to be done?");

    // Create 1st todo
    await newTodo.fill(TODO_ITEMS[0]);
    await newTodo.press("Enter");

    // Check that the list only has one todo item
    const todoItems = page.getByTestId("todo-title")
    await expect(todoItems).toHaveText([TODO_ITEMS[0]]);

    // Note that we pass an array with one item, to make sure, that only one item was created

    // Create 2nd todo.
    await newTodo.fill(TODO_ITEMS[1]);
    await newTodo.press("Enter");

    // Check that the list now has two todo items
    await expect(page.getByTestId("todo-title")).toHaveText([
      TODO_ITEMS[0],
      TODO_ITEMS[1],
    ]);

    // The Todo App saves the items into local storage of the browser.
    // Finally, we check if there are two items in the local storage of the browser now
    // We can assert this with page.waitForFunction
    await page.waitForFunction(e => {
      return JSON.parse(localStorage["react-todos"]).length === e;
    }, 2)
  })
})
