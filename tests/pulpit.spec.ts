import { expect, test } from '@playwright/test';
import { loginData } from '../test-data/login.data';
import { LoginPage } from '../pages/login.page';
import { PulpitPage } from '../pages/pulpit.page';
import correctPaymentData from '../test-data/payment-correct-data.json';
import correctTopUpData from '../test-data/top-up-correct-data.json';
import incorrectTopUpData from '../test-data/top-up-incorrect-data.json';
import { str } from '../strings/strings';
import { phones } from '../test-data/top-up-phone-numbers.data';
import { faker } from '@faker-js/faker';

test.describe('Pulpit tests', () => {
    let pulpitPage: PulpitPage;

    test.beforeEach(async ({ page }) => {
        await page.goto('/');
        const loginPage = new LoginPage(page);
        await loginPage.login(loginData.userId, loginData.userPassword);
        pulpitPage = new PulpitPage(page);
    });

    test.describe('Quick payment', () => {
        for (const d of correctPaymentData) {
            test(`Successful: with correct data (id: ${d.id})`, { tag: ['@payment', '@integration'] }, async () => {
                await pulpitPage.quickPayment(d.receiverId, d.transferAmount, d.transferTitle);
                await expect(pulpitPage.messageText).toHaveText(
                    `${str.paymentDone} ${d.expectedTransferReceiver} - ${d.transferAmount},00PLN - ${d.transferTitle}`,
                );
            });
        }
    });

    test.describe('Phone top-up', () => {
        for (const d of correctTopUpData) {
            test(`Successful: with correct data (id: ${d.id})`, { tag: ['@payment', '@integration'] }, async () => {
                await pulpitPage.phoneTopUp(d.receiverPhoneNumber, d.topUpAmount);
                await expect(pulpitPage.messageText).toHaveText(
                    `${str.topUpDone} ${d.topUpAmount},00PLN ${str.toTheNumber} ${d.receiverPhoneNumber}`,
                );
            });
        }

        test('Unsuccessful: without entering data', { tag: ['@payment', '@integration'] }, async () => {
            await pulpitPage.topUpButton.click();
            await expect(pulpitPage.topUpReceiverRequired).toHaveText(str.requiredField);
            await expect(pulpitPage.topUpAmountRequired).toHaveText(str.requiredField);
            await expect(pulpitPage.topUpAgreementRequired).toHaveText(str.requiredField);
        });

        let phoneNumber = phones[faker.number.int(phones.length - 1)];
        let amount = String(faker.number.float({ min: 10, max: 50, fractionDigits: 2 }));

        test('Unsuccessful: without entering receiver', { tag: ['@payment', '@integration'] }, async () => {
            console.log(amount);
            await pulpitPage.tryToDoPhoneTopUp('', amount, true);
            await expect(pulpitPage.topUpReceiverRequired).toHaveText(str.requiredField);
        });

        test('Unsuccessful: without entering amount', { tag: ['@payment', '@integration'] }, async () => {
            await pulpitPage.tryToDoPhoneTopUp(phoneNumber, '', true);
            await expect(pulpitPage.topUpAmountRequired).toHaveText(str.requiredField);
        });

        test('Unsuccessful: without agreement', { tag: ['@payment', '@integration'] }, async () => {
            await pulpitPage.tryToDoPhoneTopUp(phoneNumber, amount, false);
            await expect(pulpitPage.topUpAgreementRequired).toHaveText(str.requiredField);
        });

        // for (const d of incorrectTopUpData) {
        //     test(`Unsuccessful: with incorrect amount (id: ${d.id})`, { tag: ['@payment', '@integration'] }, async () => {
        //         // await ...
        //         // await expect ...
        //     });
        // }
    });

    for (const d of correctTopUpData) {
        test(
            `Correct balance after successful phone top-up (id: ${d.id})`,
            { tag: ['@payment', '@integration'] },
            async () => {
                const initialBalance = await pulpitPage.moneyValue.innerText();
                const expectedBalance = Number(initialBalance) - Number(d.topUpAmount);

                await pulpitPage.phoneTopUp(d.receiverPhoneNumber, d.topUpAmount);

                await expect(pulpitPage.moneyValue).toHaveText(`${expectedBalance}`);
            },
        );
    }
});
