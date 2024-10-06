import { expect, test } from '@playwright/test';

test.describe('Pulpit tests', () => {
    const url = 'https://demo-bank.vercel.app/index.html';
    const userId = 'testLOL1';
    const userPassword = 'qwer1234';
    test('Quick payment with correct data', async ({ page }) => {
        // Arrange
        const receiverId = '2';
        const transferAmount = '50';
        const transferTitle = 'Pizza';
        const expectedTransferReceniver = 'Chuck Demobankowy';

        // Act
        await page.goto(url);
        await page.getByTestId('login-input').fill(userId);
        await page.getByTestId('password-input').fill(userPassword);
        await page.getByTestId('login-button').click();

        await page.locator('#widget_1_transfer_receiver').selectOption(receiverId);
        await page.locator('#widget_1_transfer_amount').fill(transferAmount);
        await page.locator('#widget_1_transfer_title').fill(transferTitle);
        await page.getByRole('button', { name: 'wykonaj' }).click();
        await page.getByTestId('close-button').click();

        // Assert
        await expect(page.locator('#show_messages')).toHaveText(
            `Przelew wykonany! ${expectedTransferReceniver} - ${transferAmount},00PLN - ${transferTitle}`);
    });

    test('Successful phone top-up', async ({ page }) => {
        await page.goto(url);
        await page.getByTestId('login-input').fill(userId);
        await page.getByTestId('password-input').fill(userPassword);
        await page.getByTestId('login-button').click();
        await page.locator('#widget_1_topup_receiver').selectOption('500 xxx xxx');
        await page.locator('#widget_1_topup_amount').fill('30');
        await page.locator('#uniform-widget_1_topup_agreement span').click(); // checkbox
        await page.getByRole('button', { name: 'doładuj telefon' }).click();
        await page.getByTestId('close-button').click();

        await expect(page.locator('#show_messages')).toHaveText('Doładowanie wykonane! 30,00PLN na numer 500 xxx xxx');
    });
});