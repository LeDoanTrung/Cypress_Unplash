import { GetPhotographerProfile } from "../constant/api_endPoint";
import { StringFormat } from "../support/extension/string_extension";

const apiUrl = Cypress.env('apiURL');
export default class PhotoGrapherService {

    /**
     * Fetches the profile of a photographer.
     * @param {string} token - The authorization token.
     * @param {string} username - The username of the photographer.
     * @returns {Promise} - The API response.
     */
    static getPhotoGrapherProfile(token, username) {
        
        const url = `${apiUrl}${StringFormat(GetPhotographerProfile, username)}`;

        const headers = {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        };

        return cy.apiGetRequest(url, headers);
    }
}