import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { PulpitPage } from '../pages/pulpit.page';
import correctLoginData from '../test-data/login-correct-data.json';
import incorrectLoginData from '../test-data/login-incorrect-data.json';

test.describe('User login to Demobank', () => {
    let loginPage: LoginPage;

    test.beforeEach(async ({ page }) => {
        await page.goto('/');
        loginPage = new LoginPage(page);
    });

    for (const d of correctLoginData) {
        test(
            `Successful login (id: ${d.id})`,
            {
                tag: ['@login', '@smoke'],
                annotation: { type: 'Type', description: 'basic happy path' },
            },
            async ({ page }) => {
                await loginPage.login(d.userId, d.userPassword);
                const pulpitPage = new PulpitPage(page);
                await expect(pulpitPage.userNameText).toHaveText(pulpitPage.expectedUserName);
            },
        );
    }

    for (const d of incorrectLoginData) {
        test(
            `Unsuccessful login with too short username (id: ${d.id})`,
            {
                tag: ['@login', '@unhappy_path'],
                annotation: {
                    type: 'Documentation',
                    description: 'https://jaktestowac.pl/course/playwright-wprowadzenie/',
                },
            },
            async () => {
                await loginPage.loginInput.fill(d.userId);
                await loginPage.loginInput.blur();
                await expect(loginPage.loginError).toHaveText(loginPage.loginErrorMessage);
            },
        );
    }

    for (const d of incorrectLoginData) {
        test(
            `Unsuccessful login with too short password (id: ${d.id})`,
            { tag: ['@login', '@unhappy_path'] },
            async () => {
                await loginPage.passwordInput.fill(d.userPassword);
                await loginPage.passwordInput.blur();
                await expect(loginPage.passwordError).toHaveText(loginPage.passwordErrorMessage);
            },
        );
    }

    test('Unsuccessful login without entering data', { tag: ['@login', '@unhappy_path'] }, async () => {
        await loginPage.loginInput.click();
        await loginPage.passwordInput.click();
        await loginPage.passwordInput.blur();
        await expect(loginPage.loginError).toHaveText(loginPage.requiredText);
        await expect(loginPage.passwordError).toHaveText(loginPage.requiredText);
    });
});
