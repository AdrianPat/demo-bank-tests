import test, { expect } from '@playwright/test';
import { loginData } from '../test-data/login.data';
import { LoginPage } from '../pages/login.page';
import { PaymentPage } from '../pages/payment.page';
import { PulpitPage } from '../pages/pulpit.page';
import correctPaymentData from '../test-data/payment-correct-data.json';

test.describe('Payment in Demobank', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/');
        const loginPage = new LoginPage(page);
        await loginPage.login(loginData.userId, loginData.userPassword);
        const pulpitPage = new PulpitPage(page);
        await pulpitPage.sideMenu.paymentButton.click();
    });

    for (const d of correctPaymentData) {
        test(`Successful payment ("${d.receiverId}")`, { tag: ['@payment', '@integration'] }, async ({ page }) => {
            const paymentPage = new PaymentPage(page);
            await paymentPage.makeTransfer(d.transferReceiver, d.transferAccount, d.transferAmount, d.transferTitle);

            const pulpitPage = new PulpitPage(page);
            await expect(pulpitPage.messageText).toHaveText(
                `Przelew wykonany! ${d.transferAmount},00PLN dla ${d.transferReceiver}`,
            );
        });
    }
});
