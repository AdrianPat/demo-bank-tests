import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { PulpitPage } from '../pages/pulpit.page';
import correctLoginData from '../test-data/login-correct-data.json';
import incorrectLoginData from '../test-data/login-incorrect-data.json';
import { loginData } from '../test-data/login.data';

test.describe('Login', () => {
    let loginPage: LoginPage;

    test.beforeEach(async ({ page }) => {
        await page.goto('/');
        loginPage = new LoginPage(page);
    });

    test.describe('Successful', () => {
        for (const d of correctLoginData) {
            test(
                `With correct data (id: ${d.id})`,
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
    });

    test.describe('Unsuccessful', () => {
        test('Without entering data', { tag: ['@login', '@unhappy_path'] }, async () => {
            await loginPage.tryToLogin('', '');
            await expect(loginPage.loginError).toHaveText(loginPage.requiredFieldText);
            await expect(loginPage.passwordError).toHaveText(loginPage.requiredFieldText);
        });

        test('Without entering username', { tag: ['@login', '@unhappy_path'] }, async () => {
            await loginPage.tryToLogin('', loginData.userPassword);
            await expect(loginPage.loginError).toHaveText(loginPage.requiredFieldText);
        });

        test('Without entering password', { tag: ['@login', '@unhappy_path'] }, async () => {
            await loginPage.tryToLogin(loginData.userId, '');
            await expect(loginPage.passwordError).toHaveText(loginPage.requiredFieldText);
        });

        for (const d of incorrectLoginData) {
            test(
                `Too short username (id: ${d.id})`,
                {
                    tag: ['@login', '@unhappy_path'],
                    annotation: {
                        type: 'Documentation',
                        description: 'https://jaktestowac.pl/course/playwright-wprowadzenie/',
                    },
                },
                async () => {
                    await loginPage.tryToLogin(d.userId, loginData.userPassword);
                    await expect(loginPage.loginError).toHaveText(loginPage.loginErrorMessage);
                },
            );
        }

        for (const d of incorrectLoginData) {
            test(`Too short password (id: ${d.id})`, { tag: ['@login', '@unhappy_path'] }, async () => {
                await loginPage.tryToLogin(loginData.userId, d.userPassword);
                await expect(loginPage.passwordError).toHaveText(loginPage.passwordErrorMessage);
            });
        }

        for (const d of incorrectLoginData) {
            test(`Too short username and password (id: ${d.id})`, { tag: ['@login', '@unhappy_path'] }, async () => {
                await loginPage.tryToLogin(d.userId, d.userPassword);
                await expect(loginPage.loginError).toHaveText(loginPage.loginErrorMessage);
                await expect(loginPage.passwordError).toHaveText(loginPage.passwordErrorMessage);
            });
        }

        for (const d of incorrectLoginData) {
            test(`Too short username and no password (id: ${d.id})`, { tag: ['@login', '@unhappy_path'] }, async () => {
                await loginPage.tryToLogin(d.userId, '');
                await expect(loginPage.loginError).toHaveText(loginPage.loginErrorMessage);
                await expect(loginPage.passwordError).toHaveText(loginPage.requiredFieldText);
            });
        }

        for (const d of incorrectLoginData) {
            test(`Too short password and no username (id: ${d.id})`, { tag: ['@login', '@unhappy_path'] }, async () => {
                await loginPage.tryToLogin('', d.userPassword);
                await expect(loginPage.loginError).toHaveText(loginPage.requiredFieldText);
                await expect(loginPage.passwordError).toHaveText(loginPage.passwordErrorMessage);
            });
        }

        test.afterEach(async () => {
            await expect(loginPage.loginButton).toBeDisabled();
        });
    });
});
