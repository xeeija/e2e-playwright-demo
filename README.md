# End-to-End Testing of Web Applications

This project is part of the **End-to-End Testing of Web Applications** course by <a href="https://github.com/xeeija">Bastian Lang</a> and <a href="https://github.com/ramontip">Ramon Tippl</a></b>.

## End-to-End Testing with Playwright

The exercise is based on the TodoMVC example of Playwright, which is based on [tastejs/todomvc](https://todomvc.com/).

### Installation

1. Fork the repository to add it to your account, so you can make your own changes.

   Alternatively, you can clone the repository with the following command, if you don't want to push your changes.

    ```
    git clone https://github.com/xeeija/e2e-playwright-demo.git
    ```

2. Install the npm dependencies of the project (actually only `@playwright/test`)

    ```
    cd playwright
    npm install
    ```

3. Install browsers for running tests. Playwright downloads all browsers separately (eg. to the `AppData` folder).

    ```
    npx playwright install
    ```

4. Verify your installation. You should see your installed version, `v1.38.0` or `v1.39.0`.

    ```
    npx playwright -V
    ```

5. If you use VS Code, you can install the `Playwright Test for VS Code` extension.

**Thats it! You are ready to starting testing!**
Continue with the next page of the course to dive in.


### Setup for new projects

For new projects, Playwright can be initialized with the command below. For this exercise, the project is set up already, so you dont have to.

```
npm init playwright@latest
```
This will create a `playwright.config.ts` file with your settings, install the necessary browsers (optional) and add a Github Actions workflow (optional).

You can modify the playwright config file to your needs and add projects for testing on different platforms.

---
> FH Joanneum, Business Informatics (AIM22), Selected Topics in Software Engineering 