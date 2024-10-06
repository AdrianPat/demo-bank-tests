import { expect, test } from '@playwright/test';

test.describe('Pulpit tests', () => {
    test('Quick payment with correct data', async ({ page }) => {
        await page.goto('https://demo-bank.vercel.app/index.html');
        await page.getByTestId('login-input').fill('testLOL1');
        await page.getByTestId('password-input').fill('qwer1234');
        await page.getByTestId('login-button').click();

        await page.locator('#widget_1_transfer_receiver').selectOption('2');
        await page.locator('#widget_1_transfer_amount').fill('5');
        await page.locator('#widget_1_transfer_title').fill('Pizza');
        await page.getByRole('button', { name: 'wykonaj' }).click();
        // await page.locator('#execute_btn').click();
        await page.getByTestId('close-button').click();
        // await page.getByRole('link', { name: 'Przelew wykonany! Chuck' }).click();

        await expect(page.locator('#show_messages')).toHaveText('Przelew wykonany! Chuck Demobankowy - 5,00PLN - Pizza');
    });

    test.only('Successful phone top-up', async ({ page }) => {
        await page.goto('https://demo-bank.vercel.app/');
        await page.getByTestId('login-input').fill('qwer1234');
        await page.getByTestId('password-input').fill('poiu0987');
        await page.getByTestId('login-button').click();
        await page.locator('#widget_1_topup_receiver').selectOption('500 xxx xxx');
        await page.locator('#widget_1_topup_amount').fill('30');
        await page.locator('#uniform-widget_1_topup_agreement span').click(); // checkbox
        await page.getByRole('button', { name: 'doładuj telefon' }).click();
        await page.getByTestId('close-button').click();

        await expect(page.locator('#show_messages')).toHaveText('Doładowanie wykonane! 30,00PLN na numer 500 xxx xxx');
    });
});