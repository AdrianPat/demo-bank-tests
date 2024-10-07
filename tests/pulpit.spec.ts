import { expect, test } from '@playwright/test';

test.describe('Pulpit tests', () => {

    test.beforeEach(async ({ page }) => {
        const userId = 'testLOL1';
        const userPassword = 'pass1234';
        await page.goto('/');
        await page.getByTestId('login-input').fill(userId);
        await page.getByTestId('password-input').fill(userPassword);
        await page.getByTestId('login-button').click();
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