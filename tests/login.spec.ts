import { test, expect } from '@playwright/test';

test.describe('User login to Demobank', () => {
    test('Successful login', async ({ page }) => {
        await page.goto('https://demo-bank.vercel.app/index.html');
        await page.getByTestId('login-input').fill('testLOL1');
        await page.getByTestId('password-input').fill('qwer1234');
        await page.getByTestId('login-button').click();

        await expect(page.getByTestId('user-name')).toHaveText('Jan Demobankowy');
    });

    test('Unsuccessful login with too short username', async ({ page }) => {
        await page.goto('https://demo-bank.vercel.app/index.html');
        await page.getByTestId('login-input').fill('tester');
        await page.getByTestId('login-input').blur();

        await expect(page.getByTestId('error-login-id')).toHaveText('identyfikator ma min. 8 znaków');
    });

    test('Unsuccessful login with too short password', async ({ page }) => {
        await page.goto('https://demo-bank.vercel.app/');
        await page.getByTestId('password-input').fill('1');
        await page.getByTestId('password-input').blur(); // wyjście z pola („odkliknięcie”)

        await expect(page.getByTestId('error-login-password')).toHaveText('hasło ma min. 8 znaków');
    });
});