import API_ENDPOINT from "../constant/api_endPoint";
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
        
        const url = `${apiUrl}${StringFormat(API_ENDPOINT.GetPhotographerProfile, username)}`;

        const headers = {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        };

        return cy.apiGetRequest(url, headers, false);
    }


    /**
     * Fetches the portfolio of a photographer.
     * @param {string} token - The authorization token.
     * @param {string} username - The username of the photographer.
     * @returns {Promise} - The API response.
     */
    static getPhotoGrapherPortfolio(token, username) {
        const url = `${apiUrl}${StringFormat(API_ENDPOINT.GetPhotographerPortfolioLink, username)}`;

        const headers = {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        };

        return cy.apiGetRequest(url, headers, false);
    }


    /**
     * Fetches the photos of a photographer.
     * @param {string} token - The authorization token.
     * @param {string} username - The username of the photographer.
     * @returns {Promise} - The API response.
     */
    static getPhotoGrapherPhotos(token, username) {
        const url = `${apiUrl}${StringFormat(API_ENDPOINT.GetPhotographerPhotos, username)}`;

        const headers = {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        };

        return cy.apiGetRequest(url, headers, false);
    }


    /**
     * Fetches the liked photos of a photographer.
     * @param {string} token - The authorization token.
     * @param {string} username - The username of the photographer.
     * @returns {Promise} - The API response.
     */
    static getPhotoGrapherLikedPhotos(token, username) {
        const url = `${apiUrl}${StringFormat(API_ENDPOINT.GetPhotographerLikedPhotos, username)}`;

        const headers = {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        };

        return cy.apiGetRequest(url, headers, false);
    }

    
}