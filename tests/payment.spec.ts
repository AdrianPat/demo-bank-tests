import test, { expect } from "@playwright/test";
import { loginData } from "../test-data/login.data";

test.describe('Payment in Demobank', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('/');
    });

    test('Successful payment', async ({ page }) => {
        // Arrange
        const userId = loginData.userId;
        const userPassword = loginData.userPassword;
        const transferReceiver = 'Jaś';
        const transferAccount = '12 3456 7890 1234 5678 9012 34567';
        const transferAmount = '100';
        const transferTitle = 'Za pizzę';
        const expectedMessage = `Przelew wykonany! ${transferAmount},00PLN dla ${transferReceiver}`;

        // Act
        await page.getByTestId('login-input').fill(userId);
        await page.getByTestId('password-input').fill(userPassword);
        await page.getByTestId('login-button').click();

        await page.getByRole('link', { name: 'płatności' }).click();
        await page.getByTestId('transfer_receiver').fill(transferReceiver);
        await page.getByTestId('form_account_to').fill(transferAccount);
        await page.getByTestId('form_amount').fill(transferAmount);
        await page.getByTestId('form_title').fill(transferTitle);
        await page.getByRole('button', { name: 'wykonaj przelew' }).click();
        await page.getByTestId('close-button').click();

        // Assert
        await expect(page.locator('#show_messages')).toHaveText(expectedMessage);
    });
});