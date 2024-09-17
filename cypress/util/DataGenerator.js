import { faker } from "@faker-js/faker";
import { accountFilePath } from "../constant/FILE_PATH";
import path from 'path';

export default class DataGenerator {
    // Generate random username with letters and numbers
    static generateUsername() {
        let username = faker.internet.userName();
        username = username.toLowerCase().replace(/[^a-z]/g, '');
        const randomNumber = faker.number.int({ min: 1000, max: 9999 });
        return `${username}${randomNumber}`;
    }

    // Generate random number between 1 and 20
    static generateRandomNumber() {
        return faker.datatype.number({ min: 1, max: 20 });
    }
}