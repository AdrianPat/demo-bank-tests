import { test, expect } from '@playwright/test';
import { loginData } from '../test-data/login.data';
import { LoginPage } from '../pages/login.page';
import { PulpitPage } from '../pages/pulpit.page';

test.describe('User login to Demobank', () => {
    let loginPage: LoginPage;

    test.beforeEach(async ({ page }) => {
        await page.goto('/');
        loginPage = new LoginPage(page);
    });

    test(
        'Successful login',
        {
            tag: ['@login', '@smoke'],
            annotation: { type: 'Type', description: 'basic happy path' },
        },
        async ({ page }) => {
            await loginPage.login(loginData.userId, loginData.userPassword);
            const pulpitPage = new PulpitPage(page);
            await expect(pulpitPage.userNameText).toHaveText(pulpitPage.expectedUserName);
        },
    );

    test(
        'Unsuccessful login with too short username',
        {
            tag: ['@login', '@unhappy_path'],
            annotation: {
                type: 'Documentation',
                description: 'https://jaktestowac.pl/course/playwright-wprowadzenie/',
            },
        },
        async ({ page }) => {
            await loginPage.loginInput.fill(loginData.tooShortUserName);
            await loginPage.loginInput.blur();
            await expect(loginPage.loginError).toHaveText(loginPage.loginErrorMessage);
        },
    );

    test('Unsuccessful login with too short password', { tag: ['@login', '@unhappy_path'] }, async ({ page }) => {
        await loginPage.passwordInput.fill(loginData.tooShortPassword);
        await loginPage.passwordInput.blur();
        await expect(loginPage.passwordError).toHaveText(loginPage.passwordErrorMessage);
    });
});
