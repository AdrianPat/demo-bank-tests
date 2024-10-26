import path from 'path';
import * as fs from 'fs';
import { faker } from '@faker-js/faker';
import { phones } from '../test-data/top-up-phone-numbers.data';

const srcDir = path.resolve(__dirname, '..');
const testDataDir = path.resolve(srcDir, 'test-data');

interface LoginData {
    id: string;
    userId: string;
    userPassword: string;
}

export const generateIncorrectLoginData = (generations: number, fileName: string) => {
    const testData = faker.helpers.multiple(
        (): LoginData => {
            return {
                id: faker.string.sample(8),
                userId: faker.string.sample({ min: 1, max: 7 }),
                userPassword: faker.string.sample({ min: 1, max: 7 }),
            };
        },
        { count: generations },
    );
    fs.writeFileSync(`${testDataDir}\\${fileName}`, JSON.stringify(testData, null, 4));
};

interface TopUpData {
    id: string;
    receiverPhoneNumber: string;
    topUpAmount: string;
}

export const generateCorrectTopUpData = (generations: number, fileName: string) => {
    const testData = faker.helpers.multiple(
        (): TopUpData => {
            return {
                id: faker.string.sample(8),
                receiverPhoneNumber: phones[faker.number.int(phones.length - 1)],
                topUpAmount: String(faker.number.float({ min: 10, max: 50, fractionDigits: 2 })),
            };
        },
        { count: generations },
    );
    fs.writeFileSync(`${testDataDir}\\${fileName}`, JSON.stringify(testData, null, 4));
};

const generateIncorrectAmount = () => {
    if (faker.number.binary() == '0') {
        return String(faker.number.float({ min: 0, max: 9.99, fractionDigits: 2 }));
    } else {
        return String(faker.number.float({ min: 50.01, max: 999999999999, fractionDigits: 2 }));
    }
};

export const generateIncorrectTopUpData = (generations: number, fileName: string) => {
    const testData = faker.helpers.multiple(
        (): TopUpData => {
            return {
                id: faker.string.sample(8),
                receiverPhoneNumber: phones[faker.number.int(phones.length - 1)],
                topUpAmount: generateIncorrectAmount(),
            };
        },
        { count: generations },
    );
    fs.writeFileSync(`${testDataDir}\\${fileName}`, JSON.stringify(testData, null, 4));
};
