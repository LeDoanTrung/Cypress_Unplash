import PhotoGrapherService from '../../../service/PhotoGrapherService';
import { validateSchema } from '../../../support/extension/api_extension';
import photographerSchema from '../../../resource/schema/photographer_schema.json';
import portfolioSchema from '../../../resource/schema/portfolio_schema.json';
import photosSchema from '../../../resource/schema/list_photos_schema.json';

describe('Test request for getting Photographer Profile', { tags: ['@api'] }, function () {

    beforeEach(function () {
        cy.fixture('user.json').as('user');
        cy.fixture('photographer.json').as('photographer');
    });

    
    it('Should get the profile successfully', { tags: ['@happyCase'] }, function () {
        const token = this.user.token;
        const username = this.photographer.username;

        PhotoGrapherService.getPhotoGrapherProfile(token, username).then((response) => {
            expect(response.status).to.eq(200);

            const responseBody = response.body;

            // Verify the username in the response body
            expect(responseBody.username).to.eq(username);

            // Validate the schema of the response body
            const isValid = validateSchema(responseBody, photographerSchema);
            expect(isValid).to.be.true;
        });
    });

    it('Should return 401 when getting the profile with invalid token', { tags: ['@unhappyCase'] }, function () {
        const token = "invalidToken";
        const username = this.photographer.username;

        PhotoGrapherService.getPhotoGrapherProfile(token, username).then((response) => {
            expect(response.status).to.eq(401);
        });
    }); 
    
    it('Should return 404 for non-existent username', { tags: ['@unhappyCase'] }, function () {
        const token = this.user.token;
        const username = "nonExistentUser";

        PhotoGrapherService.getPhotoGrapherProfile(token, username).then((response) => {
            expect(response.status).to.eq(404);
        });
    });


    it('Should get the portfolio successfully', { tags: ['@happyCase'] }, function () {
        const token = this.user.token;
        const username = this.photographer.username;

        PhotoGrapherService.getPhotoGrapherPortfolio(token, username).then((response) => {
            expect(response.status).to.eq(200);

            const responseBody = response.body;

            // Validate the schema of the response body
            const isValid = validateSchema(responseBody, portfolioSchema);
            expect(isValid).to.be.true;
        });
    });

    it('Should return 401 when getting the portfolio with invalid token', { tags: ['@unhappyCase'] }, function () {
        const token = "invalidToken";
        const username = this.photographer.username;

        PhotoGrapherService.getPhotoGrapherPortfolio(token, username).then((response) => {
            expect(response.status).to.eq(401);
        });
    });

    it('Should return 404 for non-existent username when getting the portfolio', { tags: ['@unhappyCase'] }, function () {
        const token = this.user.token;
        const username = "nonExistentUser";

        PhotoGrapherService.getPhotoGrapherPortfolio(token, username).then((response) => {
            expect(response.status).to.eq(404);
        });
    });

    it('Should get the photos successfully', { tags: ['@happyCase'] }, function () {
        const token = this.user.token;
        const username = this.photographer.username;

        PhotoGrapherService.getPhotoGrapherPhotos(token, username).then((response) => {
            expect(response.status).to.eq(200);

            const responseBody = response.body;

            // Validate the schema of the response body
            const isValid = validateSchema(responseBody, photosSchema);
            expect(isValid).to.be.true;
        });
    });

    it('Should return 401 when getting the photos with invalid token', { tags: ['@unhappyCase'] }, function () {
        const token = "invalidToken";
        const username = this.photographer.username;

        PhotoGrapherService.getPhotoGrapherPhotos(token, username).then((response) => {
            expect(response.status).to.eq(401);
        });
    });

    it('Should return 404 for non-existent username when getting the photos', { tags: ['@unhappyCase'] }, function () {
        const token = this.user.token;
        const username = "nonExistentUser";

        PhotoGrapherService.getPhotoGrapherPhotos(token, username).then((response) => {
            expect(response.status).to.eq(404);
        });
    });

    it('Should get the liked photos successfully', { tags: ['@happyCase'] }, function () {
        const token = this.user.token;
        const username = this.photographer.username;

        PhotoGrapherService.getPhotoGrapherLikedPhotos(token, username).then((response) => {
            expect(response.status).to.eq(200);

            const responseBody = response.body;

            // Validate the schema of the response body
            const isValid = validateSchema(responseBody, likedPhotosSchema);
            expect(isValid).to.be.true;
        });
    });

    it('Should return 401 when getting the liked photos with invalid token', { tags: ['@unhappyCase'] }, function () {
        const token = "invalidToken";
        const username = this.photographer.username;

        PhotoGrapherService.getPhotoGrapherLikedPhotos(token, username).then((response) => {
            expect(response.status).to.eq(401);
        });
    });

    it('Should return 404 for non-existent username when getting the liked photos', { tags: ['@unhappyCase'] }, function () {
        const token = this.user.token;
        const username = "nonExistentUser";

        PhotoGrapherService.getPhotoGrapherLikedPhotos(token, username).then((response) => {
            expect(response.status).to.eq(404);
        });
    });
});
