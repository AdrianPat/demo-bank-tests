import test, { expect } from '@playwright/test';
import { loginData } from '../test-data/login.data';
import { LoginPage } from '../pages/login.page';
import { PaymentPage } from '../pages/payment.page';
import { PulpitPage } from '../pages/pulpit.page';
import { paymentData } from '../test-data/payment.data';

test.describe('Payment in Demobank', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/');
        const loginPage = new LoginPage(page);
        await loginPage.login(loginData.userId, loginData.userPassword);
        const pulpitPage = new PulpitPage(page);
        await pulpitPage.sideMenu.paymentButton.click();
    });

    test('Successful payment', { tag: ['@payment', '@integration'] }, async ({ page }) => {
        const transferReceiver = paymentData.transferReceiver;
        const transferAccount = paymentData.transferAccount;
        const transferAmount = paymentData.transferAmount;
        const transferTitle = paymentData.transferTitle;

        const paymentPage = new PaymentPage(page);
        await paymentPage.makeTransfer(transferReceiver, transferAccount, transferAmount, transferTitle);

        const pulpitPage = new PulpitPage(page);
        await expect(pulpitPage.messageText).toHaveText(
            `Przelew wykonany! ${transferAmount},00PLN dla ${transferReceiver}`,
        );
    });
});
