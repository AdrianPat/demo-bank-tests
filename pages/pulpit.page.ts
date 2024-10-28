import { Page } from '@playwright/test';
import { SideMenuComponent } from '../components/side-menu.component';

export class PulpitPage {
    constructor(private page: Page) {}

    sideMenu = new SideMenuComponent(this.page);

    userNameText = this.page.getByTestId('user-name');
    messageText = this.page.locator('#show_messages');
    moneyValue = this.page.locator('#money_value');

    /* Payment section */
    transferReceiverInput = this.page.locator('#widget_1_transfer_receiver');
    transferReceiverRequired = this.page.locator('#error_widget_1_transfer_receiver');
    transferAmountInput = this.page.locator('#widget_1_transfer_amount');
    transferAmountError = this.page.locator('#error_widget_1_transfer_amount');
    transferTitleInput = this.page.locator('#widget_1_transfer_title');
    transferTitleRequired = this.page.locator('#error_widget_1_transfer_title');
    wykonajButton = this.page.getByRole('button', { name: 'wykonaj' });
    closeButton = this.page.getByTestId('close-button');

    async quickPayment(receiverId: string, transferAmount: string, transferTitle: string): Promise<void> {
        await this.transferReceiverInput.selectOption(receiverId);
        await this.transferAmountInput.fill(transferAmount);
        await this.transferTitleInput.fill(transferTitle);
        await this.wykonajButton.click();
        await this.closeButton.click();
    }

    async tryToDoQuickPayment(receiverId: string, transferAmount: string, transferTitle: string): Promise<void> {
        await this.transferReceiverInput.selectOption(receiverId);
        await this.transferAmountInput.fill(transferAmount);
        await this.transferTitleInput.fill(transferTitle);
        await this.transferTitleInput.blur();
    }

    /* Top-up section */
    topUpReceiverInput = this.page.locator('#widget_1_topup_receiver');
    topUpReceiverRequired = this.page.locator('#error_widget_1_topup_receiver');
    topUpAmountInput = this.page.locator('#widget_1_topup_amount');
    topUpAmountError = this.page.locator('#error_widget_1_topup_amount');
    topUpAgreementCheckbox = this.page.locator('#uniform-widget_1_topup_agreement span');
    topUpAgreementRequired = this.page.locator('#error_widget_1_topup_agreement');
    topUpButton = this.page.getByRole('button', { name: 'doładuj telefon' });

    async phoneTopUp(receiverPhoneNumber: string, topUpAmount: string): Promise<void> {
        await this.topUpReceiverInput.selectOption(receiverPhoneNumber);
        await this.topUpAmountInput.fill(topUpAmount);
        await this.topUpAgreementCheckbox.click();
        await this.topUpButton.click();
        await this.closeButton.click();
    }

    async tryToDoPhoneTopUp(receiverPhoneNumber: string, topUpAmount: string, topUpAgreement: boolean): Promise<void> {
        await this.topUpReceiverInput.selectOption(receiverPhoneNumber);
        await this.topUpAmountInput.fill(topUpAmount);
        if (topUpAgreement == true) {
            await this.topUpAgreementCheckbox.click();
        }
        await this.topUpButton.click();
    }
}
