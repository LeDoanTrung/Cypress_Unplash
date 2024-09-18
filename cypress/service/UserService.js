import { GetListOfLikedPhotosEndpoint } from "../constant/api_endPoint";
import { StringFormat } from "../support/extension/string_extension";

const apiUrl = Cypress.env('apiURL');

export default class UserService {

    /**
     * Fetches the liked photos of a user.
     * @param {string} token - The authorization token.
     * @param {string} username - The username of the user.
     * @returns {Promise} - The API response.
     */
    static getListOfLikedPhotos(token, username) {
        
        const url = StringFormat(`${apiUrl}${GetListOfLikedPhotosEndpoint}`, username);

        const headers = {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        };

        return cy.apiGetRequest(url, headers);
    }
}