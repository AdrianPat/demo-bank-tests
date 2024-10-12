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
            const expectedUserName = 'Jan Demobankowy';

            await loginPage.login(loginData.userId, loginData.userPassword);
            const pulpitPage = new PulpitPage(page);

            await expect(pulpitPage.userNameText).toHaveText(expectedUserName);
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
            const tooShortUserName = 'tester';
            const loginErrorMessage = 'identyfikator ma min. 8 znaków';

            await loginPage.loginInput.fill(tooShortUserName);
            await loginPage.loginInput.blur();

            await expect(loginPage.loginError).toHaveText(loginErrorMessage);
        },
    );

    test('Unsuccessful login with too short password', { tag: ['@login', '@unhappy_path'] }, async ({ page }) => {
        const tooShortPassword = '1';
        const passwordErrorMessage = 'hasło ma min. 8 znaków';

        await loginPage.passwordInput.fill(tooShortPassword);
        await loginPage.passwordInput.blur(); // wyjście z pola („odkliknięcie”)

        await expect(loginPage.passwordError).toHaveText(passwordErrorMessage);
    });
});
