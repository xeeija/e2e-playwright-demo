# Exercise 1

Make sure you have installed Playwright before starting.

In this exercise, we use the Playwright demo as our web application to test: https://demo.playwright.dev/todomvc

## Setup

Create a new file in the `tests` directory and name it `Exercise1.spec.ts`. The `.spec.ts` ending is a naming convention for tests.

A test is basically just a function.
In order to structure our tests, we start with `test.describe`, which is defining a group of tests.

```ts
test.describe("New Todo", () => {
  // tests here
})
```

Now we add our first test inside the describe block, and state what our test should do. Usually this is done in the form of: **It (the test) "should do an action ..."**

```ts
test("should allow me to add todo items", async ({ page }) => {
  // do something
})
```

## Write the test

Inside the `test` function, the first action is usually navigating to the page. This is done with `page.goto()`.

```ts
await page.goto("https://demo.playwright.dev/todomvc")
```

We could add a `page.goto` to every test, but that is repetitive and if the page changes, we would have to change it everywhere. Thankfully, there is a special test method, that we can use to run code before every test. Add this before the "New Todo" block.

```ts
test.beforeEach(async ({ page }) => {
  await page.goto("https://demo.playwright.dev/todomvc")
})
```

Now that the we are on the right page, we need a locator for the form control to input a new todo item.
Since the input has a placeholder, we can get the locator by placeholder.

```ts
const newTodo = page.getByPlaceholder("What needs to be done?")
```


To do something in our test, we write the first item in the input and submit by pressing Enter on our `newTodo` locator.

First, create a list of todo items at the top of the file, so that we can re-use the items in all tests.

```ts
// Top of the file
const TODO_ITEMS = [
  "Go to the food store",
  "Buy some food",
];

// in the test
await newTodo.fill(TODO_ITEMS[0])
await newTodo.press("Enter")
```

Afterwards, let's check if the item was created as it should. Get the list of todo items, which has a `data-testid` attribute that we can use to locate it, and check that it contains the item we created.

```ts
const todoItems = page.getByTestId("todo-title")
await expect(todoItems).toHaveText([TODO_ITEMS[0]])
```

Note that we pass an array with one item as argument here to make sure that only one item is in the list.

Add a second todo item and check that there are two items in the list now.

```ts
// Create 2nd todo.
await newTodo.fill("Buy some food")
await newTodo.press("Enter")

// Check that the list now has two todo items
await expect(page.getByTestId("todo-title")).toHaveText([
  TODO_ITEMS[0],
  TODO_ITEMS[1],
])
```

The Todo App saves the items into local storage of the browser.

Finally, we check if there are two items in local storage now.
We can assert this with `page.waitForFunction`.

```ts
await page.waitForFunction(e => {
  return JSON.parse(localStorage["react-todos"]).length === e
}, 2)
```

## Run the test

Now that we created our first test, its time to run it and see if it passes. In the terminal, run the following command.

```bash
npx playwright test

# or run it using the test script in package.json
npm run test
```

You should see an overview of the test results in the termianl.

```
Running 3 tests using 3 workers
  3 passed (4.3s)
```

Every test is running in all browsers configured for the test, 3 in this case. In the playwright config file, the browsers can be configured via `projects`.

### UI Mode

You can also run tests in UI mode with the `--ui` flag.

```bash
npx playwright test --ui
```

This opens a window with an overview of all tests in the left sidebar, lets you run and debug your tests and shows a step by step trace for tests.

Alternatively you can run or debug tests in VS Code in the Testing tab with the Playwright extension.


## View the test report

After running the tests, an HTML report is created that shows a detailed report on which tests passend failed, how long each test took, and where some test failed.

Show the report with

```
npx playwright show-report
```

# Now it's your turn

Now that you know how to write tests, it's your turn.

Write the following three tests in the "New Todo" describe block and in a new "Mark as completed" describe block. Upload your test file and a screenshot of the test report.

```ts
// in the "New Todo" block
test("should clear text input field when an item is added", async ({ page }) => {
  // your code here
})

// in the "Mark as completed" block
test("should allow me to mark an item as completed", async ({ page }) => {
  // your code here
})

test("should allow me to mark all items as completed", async ({ page }) => {
  // your code here
})
```

You can use the helper function below to create the standard todo items for the following tests, if you need it.

```ts
async function createDefaultTodos(page: Page) {
  const newTodo = page.getByPlaceholder("What needs to be done?");

  for (const item of TODO_ITEMS) {
    await newTodo.fill(item);
    await newTodo.press("Enter");
  }
}
```
