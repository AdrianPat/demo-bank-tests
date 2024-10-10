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

    test('Successful login', { tag: ['@login', '@smoke'] }, async ({ page }) => {
        // Arrange
        const expectedUserName = 'Jan Demobankowy';

        // Act
        await loginPage.login(loginData.userId, loginData.userPassword);
        const pulpitPage = new PulpitPage(page);

        // Assert
        await expect(pulpitPage.userNameText).toHaveText(expectedUserName);
    });

    test('Unsuccessful login with too short username', { tag: '@login' }, async ({ page }) => {
        // Arrange
        const tooShortUserName = 'tester';
        const loginErrorMessage = 'identyfikator ma min. 8 znaków';

        // Act
        await loginPage.loginInput.fill(tooShortUserName);
        await loginPage.loginInput.blur();

        // Assert
        await expect(loginPage.loginError).toHaveText(loginErrorMessage);
    });

    test('Unsuccessful login with too short password', { tag: '@login' }, async ({ page }) => {
        // Arrange
        const tooShortPassword = '1';
        const passwordErrorMessage = 'hasło ma min. 8 znaków';

        // Act
        await loginPage.passwordInput.fill(tooShortPassword);
        await loginPage.passwordInput.blur(); // wyjście z pola („odkliknięcie”)

        // Assert
        await expect(loginPage.passwordError).toHaveText(passwordErrorMessage);
    });
});