import { test as setup } from '@playwright/test';
import {
    generateCorrectTopUpData,
    generateIncorrectLoginData,
    generateIncorrectTopUpData,
} from '../utils/fake-data-generators';

setup.skip('Create new test data', () => {
    generateIncorrectLoginData(1, 'login-incorrect-data.json');
    generateCorrectTopUpData(1, 'top-up-correct-data.json');
    generateIncorrectTopUpData(1, 'top-up-incorrect-data.json');
});
