import { expect, test } from '@playwright/test';
import { loginData } from '../test-data/login.data';
import { LoginPage } from '../pages/login.page';

test.describe('Pulpit tests', () => {

    test.beforeEach(async ({ page }) => {
        const userId = loginData.userId;
        const userPassword = loginData.userPassword;
        await page.goto('/');
        const loginPage = new LoginPage(page);
        await loginPage.loginInput.fill(userId);
        await loginPage.passwordInput.fill(userPassword);
        await loginPage.loginButton.click();
    });

    test('Quick payment with correct data', async ({ page }) => {
        // Arrange
        const receiverId = '2';
        const transferAmount = '50';
        const transferTitle = 'Pizza';
        const expectedTransferReceiver = 'Chuck Demobankowy';

        // Act
        await page.locator('#widget_1_transfer_receiver').selectOption(receiverId);
        await page.locator('#widget_1_transfer_amount').fill(transferAmount);
        await page.locator('#widget_1_transfer_title').fill(transferTitle);
        await page.getByRole('button', { name: 'wykonaj' }).click();
        await page.getByTestId('close-button').click();

        // Assert
        await expect(page.locator('#show_messages')).toHaveText(
            `Przelew wykonany! ${expectedTransferReceiver} - ${transferAmount},00PLN - ${transferTitle}`);
    });

    test('Successful phone top-up', async ({ page }) => {
        // Arrange
        const receiverPhoneNumber = '500 xxx xxx';
        const topUpAmount = '30';

        // Act
        await page.locator('#widget_1_topup_receiver').selectOption(receiverPhoneNumber);
        await page.locator('#widget_1_topup_amount').fill(topUpAmount);
        await page.locator('#uniform-widget_1_topup_agreement span').click(); // checkbox
        await page.getByRole('button', { name: 'doładuj telefon' }).click();
        await page.getByTestId('close-button').click();

        // Assert
        await expect(page.locator('#show_messages')).toHaveText(
            `Doładowanie wykonane! ${topUpAmount},00PLN na numer ${receiverPhoneNumber}`);
    });

    test('Correct balance after successful phone top-up', async ({ page }) => {
        // Arrange
        const receiverPhoneNumber = '500 xxx xxx';
        const topUpAmount = '30';
        const initialBalance = await page.locator('#money_value').innerText();
        const expectedBalance = Number(initialBalance) - Number(topUpAmount);

        // Act
        await page.locator('#widget_1_topup_receiver').selectOption(receiverPhoneNumber);
        await page.locator('#widget_1_topup_amount').fill(topUpAmount);
        await page.locator('#uniform-widget_1_topup_agreement span').click();
        await page.getByRole('button', { name: 'doładuj telefon' }).click();
        await page.getByTestId('close-button').click();

        // Assert
        await expect(page.locator('#money_value')).toHaveText(`${expectedBalance}`);
    });
});