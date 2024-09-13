import PhotoGrapherService from '../../../service/PhotoGrapherService';
import user from '../../../fixtures/user.json';
import photographer from '../../../fixtures/photographer.json';
import { validateSchema } from '../../../extension/api_extension';
import photographerSchema from '../../../resource/schema/photographer_schema.json';

describe('Test request for getting Photographer Profile', { tags: ['@api'] }, () => {
    it('Should get the profile successfully', () => {
        const token = user.token;
        const username = photographer.username;

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