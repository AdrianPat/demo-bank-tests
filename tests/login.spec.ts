import { test, expect } from '@playwright/test';
import { loginData } from '../test-data/login.data';

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
        await page.getByTestId('login-input').fill(userId);
        await page.getByTestId('password-input').fill(userPassword);
        await page.getByTestId('login-button').click();

        // Assert
        await expect(page.getByTestId('user-name')).toHaveText(expectedUserName);
    });

    test('Unsuccessful login with too short username', async ({ page }) => {
        // Arrange
        const tooShortUserName = 'tester';
        const loginErrorMessage = 'identyfikator ma min. 8 znaków';

        // Act
        await page.getByTestId('login-input').fill(tooShortUserName);
        await page.getByTestId('login-input').blur();

        // Assert
        await expect(page.getByTestId('error-login-id')).toHaveText(loginErrorMessage);
    });

    test('Unsuccessful login with too short password', async ({ page }) => {
        // Arrange
        const tooShortPassword = '1';
        const passwordErrorMessage = 'hasło ma min. 8 znaków';

        // Act
        await page.getByTestId('password-input').fill(tooShortPassword);
        await page.getByTestId('password-input').blur(); // wyjście z pola („odkliknięcie”)

        // Assert
        await expect(page.getByTestId('error-login-password')).toHaveText(passwordErrorMessage);
    });
});