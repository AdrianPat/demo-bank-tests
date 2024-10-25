import path from 'path';
import * as fs from 'fs';
import { faker } from '@faker-js/faker';

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
    // console.log(`Data exported to JSON file: ${testDataDir}\\${fileName}`);
};
