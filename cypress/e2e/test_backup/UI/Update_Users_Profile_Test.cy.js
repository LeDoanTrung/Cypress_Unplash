import HomePage from "../../pages/HomePage";
import  DataGenerator from "../../../util/DataGenerator";
import { accountFilePath } from "../../../constant/FILE_PATH";
const { updateJsonFile } = require('../../../util/Json_helper');

describe("Update User's profile test", { tags: ['@ui', '@smoke'] }, () => {

    let newUsername;
    let homepage;


    before(() => {
        homepage = new HomePage();
    });

    beforeEach(() =>{
        homepage.open('/');
        newUsername = DataGenerator.generateUsername();
        cy.fixture('user.json').as('user');
    });

    it('Should update user profile successfully', { tags: ['@happyCase'] }, function()  {
        const email = this.user.email;
        const password = this.user.password;

        //Login
        const loginPage = homepage.goToLoginPage();
        loginPage.loginWithUI(email, password);

        //Go to the profile page
        const profilePage = homepage.goToProfilePage();
        const editProfilePage = profilePage.goToEditProfilePage();

        //Update the username
        editProfilePage.editUserName(newUsername);
        editProfilePage.isUpdateMessageDisplayed();

        //Verify the username is updated
        homepage.goToProfilePageViaURL(newUsername);
        profilePage.isFullnameDisplayed(this.user.fullname);
    });

    afterEach(() => {
        //Update the test data at user.json after the test
        updateJsonFile(accountFilePath, 'username', newUsername);
    });
});