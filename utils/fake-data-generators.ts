import path from 'path';
import * as fs from 'fs';
import { faker } from '@faker-js/faker';
import { phones, amounts } from '../test-data/top-up.data.ts';

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

const generateCorrectAmount = (phoneNumber: string) => {
    if ([phones[0], phones[1]].includes(phoneNumber)) {
        return String(faker.number.int({ min: 5, max: 150 }));
    } else if (phoneNumber === phones[2]) {
        return String(faker.number.int({ min: 5, max: 500 }));
    } else {
        return amounts[faker.number.int(amounts.length - 1)];
    }
};

export const generateCorrectTopUpData = (generations: number, fileName: string) => {
    const testData = faker.helpers.multiple(
        (): TopUpData => {
            const phone = phones[faker.number.int(phones.length - 1)];
            return {
                id: faker.string.sample(8),
                receiverPhoneNumber: phone,
                topUpAmount: generateCorrectAmount(phone),
            };
        },
        { count: generations },
    );
    fs.writeFileSync(`${testDataDir}\\${fileName}`, JSON.stringify(testData, null, 4));
};

const generateIncorrectAmount = (phoneNumber: string) => {
    if ([phones[0], phones[1]].includes(phoneNumber)) {
        if (faker.number.binary() == '0') {
            return String(faker.number.int({ min: 0, max: 4 }));
        } else {
            return String(faker.number.int({ min: 150, max: 200 }));
        }
    } else if (phoneNumber === phones[2]) {
        if (faker.number.binary() == '0') {
            return String(faker.number.int({ min: 0, max: 4 }));
        } else {
            return String(faker.number.int({ min: 500, max: 600 }));
        }
    } else {
        return '';
    }
};

// TO DO: add generating amount with groszami (but top-up feature has bugs...)

export const generateIncorrectTopUpData = (generations: number, fileName: string) => {
    const testData = faker.helpers.multiple(
        (): TopUpData => {
            const phone = phones[faker.number.int(phones.length - 2)];
            return {
                id: faker.string.sample(8),
                receiverPhoneNumber: phone,
                topUpAmount: generateIncorrectAmount(phone),
            };
        },
        { count: generations },
    );
    fs.writeFileSync(`${testDataDir}\\${fileName}`, JSON.stringify(testData, null, 4));
};

// TO DO: add generating incorrect test data for payment
