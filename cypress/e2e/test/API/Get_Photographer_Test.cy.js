import PhotoGrapherService from '../../../service/PhotoGrapherService';
import { validateSchema } from '../../../support/extension/api_extension';
import photographerSchema from '../../../resource/schema/photographer_schema.json';


describe('Test request for getting Photographer Profile', { tags: ['@api'] }, function () {

    beforeEach(function () {
        cy.fixture('user.json').as('user');
        cy.fixture('photographer.json').as('photographer');
    });

    it('Should get the profile successfully', function () {
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
});
