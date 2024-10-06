# Test automation training from `jaktestowac.pl`

## Links
- Course  
https://jaktestowac.pl/course/playwright-wprowadzenie/
- Test site  
https://demo-bank.vercel.app/  
(if link is broken, check https://jaktestowac.pl/lesson/pw1s01l01/)
- Course repository  
https://github.com/jaktestowac/playwright_automatyzacja_wprowadzenie

## Commands
- Check NodeJS version  
`node -v`
- New project with Playwright  
`npm init playwright@latest`
- Record tests for given site  
`npx playwright codegen https://demo-bank.vercel.app/`
- Run tests without browser GUI  
`npx playwright test`
- Run tests with browser GUI  
`npx playwright test --headed`
- View report  
`npx playwright show-report`
- Cancelling Node process  
hit twice <kbd>Ctrl</kbd> + <kbd>C</kbd>

## Visual Studio Code
### Functions
- Preview: for README.md
- Autosave: File → Auto Save
- Timeline: in file context menu
- Code formatting: editor → context menu → Format document
- Searching: editor → <kbd>Ctrl</kbd> + <kbd>F</kbd>
- Accept hint in editor: <kbd>Enter</kbd>
- Comment/Uncomment: <kbd>Ctrl</kbd> + <kbd>/</kbd>
- Duplicate line: <kbd>Alt</kbd> + <kbd>Shift</kbd> + <kbd>↑</kbd>
- Use more than one terminal: <kbd>+</kbd> button in TERMINAL
- Extract to variable: <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>R</kbd>
- Move line i.e. up: <kbd>Alt</kbd> + <kbd>↑</kbd>
- Creating a new variable: Refactor <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>R</kbd> → Extract to constant in enclosing scope

## Plugins
- GitLens - view details of your repository i.e. commits history

## Playwright
### Playwright Config modifications
- config file `playwright.config.ts`
- disable browsers, i.e. Firefox  
    ```javascript
    // {
    //   name: 'firefox',
    //   use: {
    //     ...devices['Desktop Firefox'],
    //   },
    // },
    ```

### Playwright snippets
- Import:
    ```typescript
    import { test, expect } from '@playwright/test';
    ```
- Test:
    ```typescript
    test('test description', async ({ page }) => {
    
    });
    ```
- Describe:
    ```typescript
     test.describe('Group description', () => {

     });
    ```
- Running given test: `test.only`

### Locators
- `getByTestId` i.e. `getByTestId('login-input')` for element with `data-testid="login-input"`
- `getByRole` i.e. `getByRole('button', { name: 'wykonaj' })`
- `locator` i.e. `locator('#some-id')` (with `css` selector) for element with attribute `id="some-id"`

### Updating Playwright
- Check if Playwright should be updated  
`npm outdated @playwright/test` 
- Update Playwright  
`npm i @playwright/test`
- Update browsers  
`npx playwright install`
- Verify Playwright version  
`npx @playwright/test --version`

## Other
### Chrome
- Use English version!
- Open DevTools <kbd>F12</kbd> or right click `Inspect`
- Get selector: right click on element → Copy → Copy selector
- Testing CSS selectors in Console: `$$('selector')`
