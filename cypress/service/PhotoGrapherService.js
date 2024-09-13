import { GetPhotographerProfile } from "../constant/api_endPoint";

export default class PhotoGrapherService {
    static getPhotoGrapherProfile(token, username) {
        const apiUrl = Cypress.env('apiURL');
        const url = `${apiUrl}${GetPhotographerProfile.replace('{username}', username)}`;
        const headers = {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        };

        return cy.apiRequest('GET', url, headers);
    }
}