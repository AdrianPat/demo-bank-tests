import { expect, test } from '@playwright/test';
import { loginData } from '../test-data/login.data';
import { LoginPage } from '../pages/login.page';
import { PulpitPage } from '../pages/pulpit.page';

test.describe('Pulpit tests', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('/');
        const loginPage = new LoginPage(page);
        await loginPage.loginInput.fill(loginData.userId);
        await loginPage.passwordInput.fill(loginData.userPassword);
        await loginPage.loginButton.click();
    });

    test('Quick payment with correct data', async ({ page }) => {
        // Arrange
        const receiverId = '2';
        const transferAmount = '50';
        const transferTitle = 'Pizza';
        const expectedTransferReceiver = 'Chuck Demobankowy';

        // Act
        const pulpitPage = new PulpitPage(page);
        await pulpitPage.transferReceiverInput.selectOption(receiverId);
        await pulpitPage.transferAmountInput.fill(transferAmount);
        await pulpitPage.transferTitleInput.fill(transferTitle);
        await pulpitPage.wykonajButton.click();
        await pulpitPage.closeButton.click();

        // Assert
        await expect(pulpitPage.messageText).toHaveText(
            `Przelew wykonany! ${expectedTransferReceiver} - ${transferAmount},00PLN - ${transferTitle}`);
    });

    test('Successful phone top-up', async ({ page }) => {
        // Arrange
        const receiverPhoneNumber = '500 xxx xxx';
        const topUpAmount = '30';

        // Act
        const pulpitPage = new PulpitPage(page);
        await pulpitPage.topUpReceiverInput.selectOption(receiverPhoneNumber);
        await pulpitPage.topUpAmountInput.fill(topUpAmount);
        await pulpitPage.topUpAgreementCheckbox.click();
        await pulpitPage.topUpButton.click();
        await pulpitPage.closeButton.click();

        // Assert
        await expect(pulpitPage.messageText).toHaveText(
            `Doładowanie wykonane! ${topUpAmount},00PLN na numer ${receiverPhoneNumber}`);
    });

    test('Correct balance after successful phone top-up', async ({ page }) => {
        // Arrange
        const receiverPhoneNumber = '500 xxx xxx';
        const topUpAmount = '30';
        const pulpitPage = new PulpitPage(page);
        const initialBalance = await pulpitPage.moneyValue.innerText();
        const expectedBalance = Number(initialBalance) - Number(topUpAmount);

        // Act
        await pulpitPage.topUpReceiverInput.selectOption(receiverPhoneNumber);
        await pulpitPage.topUpAmountInput.fill(topUpAmount);
        await pulpitPage.topUpAgreementCheckbox.click();
        await pulpitPage.topUpButton.click();
        await pulpitPage.closeButton.click();

        // Assert
        await expect(pulpitPage.moneyValue).toHaveText(`${expectedBalance}`);
    });
});