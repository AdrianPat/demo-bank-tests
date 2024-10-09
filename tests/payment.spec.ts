import test, { expect } from "@playwright/test";
import { loginData } from "../test-data/login.data";
import { LoginPage } from "../pages/login.page";
import { PaymentPage } from "../pages/payment.page";
import { PulpitPage } from "../pages/pulpit.page";

test.describe('Payment in Demobank', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('/');
        const loginPage = new LoginPage(page);
        await loginPage.loginInput.fill(loginData.userId);
        await loginPage.passwordInput.fill(loginData.userPassword);
        await loginPage.loginButton.click();
        await page.getByRole('link', { name: 'płatności' }).click();
    });

    test('Successful payment', async ({ page }) => {
        // Arrange
        const transferReceiver = 'Jaś';
        const transferAccount = '12 3456 7890 1234 5678 9012 34567';
        const transferAmount = '100';
        const transferTitle = 'Za pizzę';
        const expectedMessage = `Przelew wykonany! ${transferAmount},00PLN dla ${transferReceiver}`;

        // Act
        const paymentPage = new PaymentPage(page);
        await paymentPage.transferReceiverInput.fill(transferReceiver);
        await paymentPage.transferAccountInput.fill(transferAccount);
        await paymentPage.transferAmountInput.fill(transferAmount);
        await paymentPage.transferTitleInput.fill(transferTitle);
        await paymentPage.wykonajButton.click();
        await paymentPage.closeButton.click();

        // Assert
        const pulpitPage = new PulpitPage(page);
        await expect(pulpitPage.messageText).toHaveText(expectedMessage);
    });
});