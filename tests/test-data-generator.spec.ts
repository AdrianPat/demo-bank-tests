import { test as setup } from '@playwright/test';
import { generateIncorrectLoginData } from '../utils/fake-data-generators';

setup.skip('Create new test data', () => {
    generateIncorrectLoginData(1, 'login-incorrect-data.json');
});
