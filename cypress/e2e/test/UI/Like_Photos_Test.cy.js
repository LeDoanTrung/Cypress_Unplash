import HomePage from "../../pages/HomePage";
import UserService from "../../../service/UserService";
import PhotoService from "../../../service/PhotoService";

describe('Like photos Test', { tags: ['@ui'] }, () => {

    let homepage;
    let user;

    before(() => {
        homepage = new HomePage();
    });

    beforeEach(() =>{
        homepage.open('/');
        cy.fixture('user.json').then((userData) => {
            user = userData;
        });
    });

    it('Should like 03 random photos successfully', { tags: ['@happyCase'] }, function()  {
        const email = user.email;
        const password = user.password;

        //Login
        const loginPage = homepage.goToLoginPage();
        loginPage.loginWithUI(email, password);

        const listOfLikedPhotos = homepage.likeRandomPhotos(1);
        homepage.goToHomePage();
        
        const profilePage = homepage.goToProfilePage();
        profilePage.goToLikesTab();

        profilePage.veriFyNUmberOfLikes(1);
        profilePage.verifyLikedPhotos(listOfLikedPhotos);
    });

    afterEach(() => {
        const token = user.token;
        const username = user.username;

         // Get the list of liked photos
        UserService.getListOfLikedPhotos(token, username).then((response) => {
            const likedPhotos = response.body;

            // Dislike each photo
            likedPhotos.forEach(photo => {
                PhotoService.dislikePhoto(token, photo.id);
            });
        });
    });
});