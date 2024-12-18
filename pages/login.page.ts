import { Page } from '@playwright/test';

export class LoginPage {
    constructor(private page: Page) {}

    loginInput = this.page.getByTestId('login-input');
    loginError = this.page.getByTestId('error-login-id');
    passwordInput = this.page.getByTestId('password-input');
    passwordError = this.page.getByTestId('error-login-password');
    loginButton = this.page.getByTestId('login-button');

    async login(userId: string, userPassword: string): Promise<void> {
        await this.loginInput.fill(userId);
        await this.passwordInput.fill(userPassword);
        await this.loginButton.click();
    }

    async tryToLogin(userId: string, userPassword: string): Promise<void> {
        await this.loginInput.fill(userId);
        await this.passwordInput.fill(userPassword);
        await this.passwordInput.blur();
    }
}
