import { Page } from "@playwright/test";

export class LoginPage {

    constructor(private page: Page) { }

    loginInput = this.page.getByTestId('login-input');
    loginError = this.page.getByTestId('error-login-id');
    passwordInput = this.page.getByTestId('password-input');
    passwordError = this.page.getByTestId('error-login-password');
    loginButton = this.page.getByTestId('login-button');
}