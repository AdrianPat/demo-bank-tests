import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { PulpitPage } from '../pages/pulpit.page';
import userLoginDataSuccessful from '../test-data/login-data-s.json';
import userLoginDataUnsuccessful from '../test-data/login-data-u.json';

test.describe('User login to Demobank', () => {
    let loginPage: LoginPage;

    test.beforeEach(async ({ page }) => {
        await page.goto('/');
        loginPage = new LoginPage(page);
    });

    for (const data of userLoginDataSuccessful) {
        test(
            `Successful login ("${data.userId}", "${data.userPassword}")`,
            {
                tag: ['@login', '@smoke'],
                annotation: { type: 'Type', description: 'basic happy path' },
            },
            async ({ page }) => {
                await loginPage.login(data.userId, data.userPassword);
                const pulpitPage = new PulpitPage(page);
                await expect(pulpitPage.userNameText).toHaveText(pulpitPage.expectedUserName);
            },
        );
    }

    for (const data of userLoginDataUnsuccessful) {
        test(
            `Unsuccessful login with too short username ("${data.userId}")`,
            {
                tag: ['@login', '@unhappy_path'],
                annotation: {
                    type: 'Documentation',
                    description: 'https://jaktestowac.pl/course/playwright-wprowadzenie/',
                },
            },
            async ({ page }) => {
                await loginPage.loginInput.fill(data.userId);
                await loginPage.loginInput.blur();
                await expect(loginPage.loginError).toHaveText(loginPage.loginErrorMessage);
            },
        );
    }

    for (const data of userLoginDataUnsuccessful) {
        test(
            `Unsuccessful login with too short password ("${data.userPassword}")`,
            { tag: ['@login', '@unhappy_path'] },
            async ({ page }) => {
                await loginPage.passwordInput.fill(data.userPassword);
                await loginPage.passwordInput.blur();
                await expect(loginPage.passwordError).toHaveText(loginPage.passwordErrorMessage);
            },
        );
    }

    test('Unsuccessful login without entering data', async ({ page }) => {
        await loginPage.loginInput.click();
        await loginPage.passwordInput.click();
        await loginPage.passwordInput.blur();
        await expect(loginPage.loginError).toHaveText(loginPage.requiredText);
        await expect(loginPage.passwordError).toHaveText(loginPage.requiredText);
    });
});
