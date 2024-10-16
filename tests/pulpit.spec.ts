import { expect, test } from '@playwright/test';
import { loginData } from '../test-data/login.data';
import { LoginPage } from '../pages/login.page';
import { PulpitPage } from '../pages/pulpit.page';
import correctPaymentData from '../test-data/payment-correct-data.json';
import correctTopUpData from '../test-data/top-up-correct-data.json';

test.describe('Pulpit tests', () => {
    let pulpitPage: PulpitPage;

    test.beforeEach(async ({ page }) => {
        await page.goto('/');
        const loginPage = new LoginPage(page);
        await loginPage.login(loginData.userId, loginData.userPassword);
        pulpitPage = new PulpitPage(page);
    });

    for (const d of correctPaymentData) {
        test(
            `Quick payment with correct data ("${d.receiverId}")`,
            { tag: ['@payment', '@integration'] },
            async ({}) => {
                await pulpitPage.quickPayment(d.receiverId, d.transferAmount, d.transferTitle);
                await expect(pulpitPage.messageText).toHaveText(
                    `Przelew wykonany! ${d.expectedTransferReceiver} - ${d.transferAmount},00PLN - ${d.transferTitle}`,
                );
            },
        );
    }

    for (const d of correctTopUpData) {
        test(
            `Successful phone top-up ("${d.receiverPhoneNumber}")`,
            { tag: ['@payment', '@integration'] },
            async ({}) => {
                await pulpitPage.phoneTopUp(d.receiverPhoneNumber, d.topUpAmount);
                await expect(pulpitPage.messageText).toHaveText(
                    `Doładowanie wykonane! ${d.topUpAmount},00PLN na numer ${d.receiverPhoneNumber}`,
                );
            },
        );
    }

    for (const d of correctTopUpData) {
        test(
            `Correct balance after successful phone top-up ("${d.receiverPhoneNumber}")`,
            { tag: ['@payment', '@integration'] },
            async ({}) => {
                const initialBalance = await pulpitPage.moneyValue.innerText();
                const expectedBalance = Number(initialBalance) - Number(d.topUpAmount);

                await pulpitPage.phoneTopUp(d.receiverPhoneNumber, d.topUpAmount);

                await expect(pulpitPage.moneyValue).toHaveText(`${expectedBalance}`);
            },
        );
    }
});
