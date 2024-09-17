import { GetPhotographerProfile } from "../constant/api_endPoint";

const apiUrl = Cypress.env('apiURL');
export default class PhotoGrapherService {

    /**
     * Fetches the profile of a photographer.
     * @param {string} token - The authorization token.
     * @param {string} username - The username of the photographer.
     * @returns {Promise} - The API response.
     */
    static getPhotoGrapherProfile(token, username) {
        
        const url = `${apiUrl}${GetPhotographerProfile.replace('{username}', username)}`;

        const headers = {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        };

        return cy.apiRequest('GET', url, headers);
    }
}