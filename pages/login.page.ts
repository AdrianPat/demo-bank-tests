import { Page } from '@playwright/test';

export class LoginPage {
    constructor(private page: Page) {}

    loginInput = this.page.getByTestId('login-input');
    loginError = this.page.getByTestId('error-login-id');
    loginErrorMessage = 'identyfikator ma min. 8 znaków';
    passwordInput = this.page.getByTestId('password-input');
    passwordError = this.page.getByTestId('error-login-password');
    passwordErrorMessage = 'hasło ma min. 8 znaków';
    loginButton = this.page.getByTestId('login-button');

    requiredFieldText = 'pole wymagane';

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
