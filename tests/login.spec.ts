import { test, expect } from '@playwright/test';
import { loginData } from '../test-data/login.data';
import { LoginPage } from '../pages/login.page';

test.describe('User login to Demobank', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('/');
    });

    test('Successful login', async ({ page }) => {
        // Arrange
        const userId = loginData.userId;
        const userPassword = loginData.userPassword;
        const expectedUserName = 'Jan Demobankowy';

        // Act
        const loginPage = new LoginPage(page);
        await loginPage.loginInput.fill(userId);
        await loginPage.passwordInput.fill(userPassword);
        await loginPage.loginButton.click();

        // Assert
        await expect(page.getByTestId('user-name')).toHaveText(expectedUserName);
    });

    test('Unsuccessful login with too short username', async ({ page }) => {
        // Arrange
        const tooShortUserName = 'tester';
        const loginErrorMessage = 'identyfikator ma min. 8 znaków';

        // Act
        const loginPage = new LoginPage(page);
        await loginPage.loginInput.fill(tooShortUserName);
        await loginPage.loginInput.blur();

        // Assert
        await expect(loginPage.loginError).toHaveText(loginErrorMessage);
    });

    test('Unsuccessful login with too short password', async ({ page }) => {
        // Arrange
        const tooShortPassword = '1';
        const passwordErrorMessage = 'hasło ma min. 8 znaków';

        // Act
        const loginPage = new LoginPage(page);
        await loginPage.passwordInput.fill(tooShortPassword);
        await loginPage.passwordInput.blur(); // wyjście z pola („odkliknięcie”)

        // Assert
        await expect(loginPage.passwordError).toHaveText(passwordErrorMessage);
    });
});