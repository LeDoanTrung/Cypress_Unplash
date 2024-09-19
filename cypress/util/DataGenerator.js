import { faker } from "@faker-js/faker";
import _ from "lodash";


/**
 * DataGenerator class provides methods to generate random data such as usernames and numbers.
 */
export default class DataGenerator {
    /**
     * Generates a random username consisting of letters and numbers.
     * The username is generated using faker and then sanitized to include only lowercase letters.
     * A random number between 1000 and 9999 is appended to the username.
     * 
     * @returns {string} - The generated username.
     */
    static generateUsername() {
        let username = faker.internet.userName();
        username = username.toLowerCase().replace(/[^a-z]/g, '');
        const randomNumber = faker.number.int({ min: 1000, max: 9999 });
        return `${username}${randomNumber}`;
    }

    /**
     * Generates a random number between 1 and 20.
     * 
     * @returns {number} - The generated random number.
     */
    static generateRandomNumber() {
        return  _.random(1, 20);
    }
}