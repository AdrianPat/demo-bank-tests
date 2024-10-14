# Test Automation training from `jaktestowac.pl`

This is a test automation project based on `Playwright` and `TypeScript`.  
The tested page is a simple demo of a bank.
- [Links](#links)
- [Commands](#commands)
- [Visual Studio Code](#visual-studio-code)
- [Extensions](#extensions)
- [Playwright](#playwright)
- [Other](#other)
- [Simple Page Object Model](#simple-page-object-model)

## Links

- Course:  
https://jaktestowac.pl/course/playwright-wprowadzenie/
- Test site:  
https://demo-bank.vercel.app/  
  If link is broken, check:  
  https://jaktestowac.pl/lesson/pw1s01l01/
- Code repository:  
https://github.com/jaktestowac/playwright_automatyzacja_wprowadzenie

## Commands

- Check NodeJS version:  
  `node -v`
- New project with Playwright:  
  `npm init playwright@latest`
- Record tests for given site:  
  `npx playwright codegen https://demo-bank.vercel.app/`
- Run tests without browser GUI:  
  `npx playwright test`
- Run tests with browser GUI:  
  `npx playwright test --headed`
- View report:  
  `npx playwright show-report`
- Run Trace Viewer on zip file:  
  `npx playwright show-trace trace.zip`
- Run tests form exact file:  
  `npx playwright test tests/login.spec.ts`
- Run tests with selected tag `@login`:  
  `npx playwright test --grep "@login"`

### Updating Playwright

- Check if Playwright should be updated:  
  `npm outdated @playwright/test`
- Update Playwright:  
  `npm i @playwright/test`
- Update browsers:  
  `npx playwright install`
- Verify Playwright version:  
  `npx @playwright/test --version`

## Visual Studio Code

### Functions

- Preview: for README.md
- Timeline: file context menu → Open Timeline
- Autosave: File → Auto Save
- Searching: editor → <kbd>CTRL</kbd> + <kbd>F</kbd>
- Accept hint in editor: <kbd>Enter</kbd>
- Comment/Uncomment: <kbd>Ctrl</kbd> + <kbd>/</kbd>
- Duplicate line: <kbd>Alt</kbd> + <kbd>Shift</kbd> + <kbd>↑</kbd>
- Extract to variable: <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>R</kbd>
- Move line i.e. up: <kbd>Alt</kbd> + <kbd>↑</kbd>
- Show autocomplete suggestion: <kbd>Ctrl</kbd> + <kbd>Spacebar</kbd>
- Formatting: editor → context menu → Format Document
- Formatting shortcut: <kbd>Shift</kbd> + <kbd>Alt</kbd> + <kbd>F</kbd>
- Format code on save: 
  - Top menu: View → Open Command Palette
  - Type: user settings — chose `Preferences: Open User Settings`
  - Search: format on save
  - Edit: check `Editor Format On Save`
- Reload Window: 
  - <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>P</kbd>
  - Find and use: `Developer: Reload Window`
- Rename in opened files: <kbd>F2</kbd>
- Show quick fix: <kbd>Ctrl</kbd> + </kbd>.</kbd>
- Creating a new variable: Refactor <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>R</kbd> → Extract to constant in enclosing scope

### Terminal (console)

- Open: <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>`</kbd>
- Cancelling Node process: hit twice <kbd>Ctrl</kbd> + <kbd>C</kbd>
- Open file: <kbd>Ctrl</kbd> + mouse click
- Autocomplete: <kbd>Tab</kbd>
- Paste in terminal shortcuts:
  - <kbd>Ctrl</kbd> + <kbd>V</kbd>
  - <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>V</kbd>
  - <kbd>Shift</kbd> + <kbd>Insert</kbd>
  - right mouse button
- Use more than one terminal: <kbd>+</kbd> sign in TERMINAL
- Use another terminal (Git Bash, JavaScript Debug): <kbd>˅</kbd> sign in TERMINAL

To quickly evaluate code use `DEBUG CONSOLE`.

## Extensions

- GitLens — view details of your repository i.e. commits history
- Prettier — default formatter for editor
- Playwright Test for VSCode — run and record tests form VSC

## Playwright

### Playwright Config modifications

- Config file `playwright.config.ts`
- Disable browsers, i.e. Firefox:
  ```javascript
  // {
  //   name: 'firefox',
  //   use: {
  //     ...devices['Desktop Firefox'],
  //   },
  // },
  ```
- Enable video on fail:
  ```javascript
  use: {
      video: {'retain-on-failure'},
  },
  ```
- Enable Trace Viewer on fail:
  ```javascript
  use: {
      trace: {'retain-on-failure'},
  },
  ```

### Playwright snippets

- Import:
  ```typescript
  import { test, expect } from '@playwright/test';
  ```
- Test:
  ```typescript
  test('test description', async ({ page }) => {
      // your code
  });
  ```
- Describe:
  ```typescript
  test.describe('Group description', () => {
      // your code
  });
  ```
- hook beforeEach:
  ```typescript
  test.befoerEach(async ({ page }) => {
      // your code
  });
  ```
- Running given test: `test.only`

### Locators

- `getByTestId` i.e. `getByTestId('login-input')` for element with `data-testid="login-input"`
- `getByRole` i.e. `getByRole('button', { name: 'wykonaj' })`
- `locator` i.e. `locator('#some-id')` (with `css` selector) for element with attribute `id="some-id"`

## Other

### Chrome

- Use English version!
- Open DevTools: <kbd>F12</kbd> or right click → `Inspect`
- Get selector: right click on element → Copy → Copy selector
- Testing CSS selectors in Console: `$$('selector')`

### Prettier

- Install Prettier  
  `npm install --save-dev --save-exact prettier`
- Configure Prettier

  - Exclude files in `.prettierignore`:

    ```
    package-lock.json
    playwright-report
    test-results

    ```

  - Set rules in `.prettierrc.json`:
    ```
    {
        "tabWidth": 4,
        "printWidth": 120,
        "singleQuote": true,
        "endOfLine": "auto"
    }
    ```

- Run Prettier:  
  `npx prettier --write .`
- Additionally you can install VSC extension: **Prettier**
  - and set default VSC formatter as Prettier (right mouse button and `Format document with ...`)

### package.json — example scripts

- Single command:  
  `"test": "npx playwright test",`
- Command with parameters:  
  `"test:headed": "npx playwright test --headed",`
- Other script with added parameters:  
  `"test:pulpit:hd" : "npm run test tests/pulpit.spec.ts -- --headed"`

Scripts can be run in standard and debug mode by:

- hovering over script name and using option **Run**;
- entering command `npm run script_name` i.e. `npm run test`;
- using `NPM Scripts` tab in **Explorer** view (need to be enabled in **EXPLORER** settings).

## Simple Page Object Model

Simple implementation of Page Object Model can be based on _classes_ that represents and implements tested pages.
Those classes contain _locators_ of elements, that are used in tests, e.g. buttons, inputs etc.

Directory structure:

```
+-- Projects
|   +-- pages
|       +-- login.page.ts
|       +-- ...
|   +-- tests
|       +-- login.spac.ts
|       +-- ...
```

### Page implementation

Simple implementation of login page in `./pages/login.page.ts`:

```
import { Page } from '@playwright/test';

export class LoginPage {
    constructor(private page: Page) {}

    loginInput = this.page.getByTestId('login-input');
    passwordInput = this.page.getByTestId('password-input');
    loginButton = this.page.getByTestId('login-button');

    async login(userId: string, userPassword:string): Promise<void> {
        await this.loginInput.fill(userId)
        await this.passwordInput.fill(userPassword)
        await this.loginButton.click()
    }
}

```

#### Usage in tests

First import of selected page:

```
import { LoginPage } from '../pages/login.page';
```

Then use page in tests:

```
    // Act
    const loginPage = new LoginPage(page)
    await loginPage.login(userId, userPassword)
```