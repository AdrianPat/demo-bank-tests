import { test, expect } from '@playwright/test';

test.describe('User login to Demobank', () => {
    const url = 'https://demo-bank.vercel.app/index.html';
    test('Successful login', async ({ page }) => {
        // Arrange
        const userId = 'testLOL1';
        const userPassword = 'qwer1234';
        const expectedUserName = 'Jan Demobankowy';

        // Act
        await page.goto(url);
        await page.getByTestId('login-input').fill(userId);
        await page.getByTestId('password-input').fill(userPassword);
        await page.getByTestId('login-button').click();

        // Assert
        await expect(page.getByTestId('user-name')).toHaveText(expectedUserName);
    });

    test('Unsuccessful login with too short username', async ({ page }) => {
        await page.goto(url);
        await page.getByTestId('login-input').fill('tester');
        await page.getByTestId('login-input').blur();

        await expect(page.getByTestId('error-login-id')).toHaveText('identyfikator ma min. 8 znaków');
    });

    test('Unsuccessful login with too short password', async ({ page }) => {
        await page.goto(url);
        await page.getByTestId('password-input').fill('1');
        await page.getByTestId('password-input').blur(); // wyjście z pola („odkliknięcie”)

        await expect(page.getByTestId('error-login-password')).toHaveText('hasło ma min. 8 znaków');
    });
});