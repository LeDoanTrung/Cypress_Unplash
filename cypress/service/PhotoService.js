import { DislikePhotoEndpoint } from "../constant/api_endPoint";
import { StringFormat } from "../support/extension/string_extension";

const apiUrl = Cypress.env('apiURL');

export default class PhotoService {

    /**
     * Fetches the liked photos of a user.
     * @param {string} token - The authorization token.
     * @param {string} username - The username of the user.
     * @returns {Promise} - The API response.
     */
    static dislikePhoto(token, photoId) {
        
        const url = StringFormat(`${apiUrl}${DislikePhotoEndpoint}`, photoId);

        const headers = {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        };

        return cy.apiDeleteRequest(url, headers);
    }
}