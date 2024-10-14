import { expect, test } from '@playwright/test';
import { loginData } from '../test-data/login.data';
import { LoginPage } from '../pages/login.page';
import { PulpitPage } from '../pages/pulpit.page';
import { paymentData } from '../test-data/payment.data';
import { topUpData } from '../test-data/top-up.data';

test.describe('Pulpit tests', () => {
    let pulpitPage: PulpitPage;

    test.beforeEach(async ({ page }) => {
        await page.goto('/');
        const loginPage = new LoginPage(page);
        await loginPage.login(loginData.userId, loginData.userPassword);
        pulpitPage = new PulpitPage(page);
    });

    test('Quick payment with correct data', { tag: ['@payment', '@integration'] }, async ({ page }) => {
        const receiverId = paymentData.receiverId;
        const transferAmount = paymentData.transferAmount;
        const transferTitle = paymentData.transferTitle;
        const expectedTransferReceiver = paymentData.expectedTransferReceiver;

        await pulpitPage.quickPayment(receiverId, transferAmount, transferTitle);

        await expect(pulpitPage.messageText).toHaveText(
            `Przelew wykonany! ${expectedTransferReceiver} - ${transferAmount},00PLN - ${transferTitle}`,
        );
    });

    test('Successful phone top-up', { tag: ['@payment', '@integration'] }, async ({ page }) => {
        await pulpitPage.phoneTopUp(topUpData.receiverPhoneNumber, topUpData.topUpAmount);
        await expect(pulpitPage.messageText).toHaveText(
            `Doładowanie wykonane! ${topUpData.topUpAmount},00PLN na numer ${topUpData.receiverPhoneNumber}`,
        );
    });

    test('Correct balance after successful phone top-up', { tag: ['@payment', '@integration'] }, async ({ page }) => {
        const initialBalance = await pulpitPage.moneyValue.innerText();
        const expectedBalance = Number(initialBalance) - Number(topUpData.topUpAmount);

        await pulpitPage.phoneTopUp(topUpData.receiverPhoneNumber, topUpData.topUpAmount);

        await expect(pulpitPage.moneyValue).toHaveText(`${expectedBalance}`);
    });
});
