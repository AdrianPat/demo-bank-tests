import { Page } from "@playwright/test";
import { SideMenuComponent } from "../components/side-menu.component";

export class PaymentPage {

    constructor(private page: Page) { }

    sideMenu = new SideMenuComponent(this.page);

    transferReceiverInput = this.page.getByTestId('transfer_receiver');
    transferAccountInput = this.page.getByTestId('form_account_to');
    transferAmountInput = this.page.getByTestId('form_amount');
    transferTitleInput = this.page.getByTestId('form_title');
    wykonajButton = this.page.getByRole('button', { name: 'wykonaj przelew' });
    closeButton = this.page.getByTestId('close-button');
}