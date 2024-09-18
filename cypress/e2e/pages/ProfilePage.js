import BasePage from "./BasePage"
import EditProfilePage from "./EditProfilePage";
import { StringFormat } from "../../support/extension/string_extension";

class ProfilePage extends BasePage{
    //Elements
    get editBtn() { return cy.getElement("//a[text()='Edit profile']"); }

    get likeTab() { return cy.getElement("//a[text()='Likes']"); }

    get imageModal() { return cy.getElement("//button[@title='Zoom in on this image']/descendant::img[@alt]"); }

    getNumberOfLikesLocator() {
        return "//a[text()='Likes']//span[text()='{0}']";
    }

    getLikedImagesLocator() {
        return "figure a[itemprop='contentUrl']";
    }

    get closeBtn() { return cy.getElement("//div[@aria-label='Modal']/div/button"); }

    //Methods
    goToEditProfilePage() {
        this.editBtn.clickOnElement();
        return new EditProfilePage();
    }

    goToLikesTab() {
        cy.waitForPageLoad();
        
        this.likeTab.clickOnElement();
    }

    isFullnameDisplayed(fullname) {
       const fullNameText = cy.getElement(`//div[text()='${fullname}']`);
       fullNameText.should('be.visible');
    }

    veriFyNUmberOfLikes(number) {
        const numberOfLikes = StringFormat(this.getNumberOfLikesLocator(),number);
        cy.getElement(numberOfLikes).should('be.visible');
    }

    verifyLikedPhotos(likedPhotos) {
        // Get all the photos in the liked tab and verify if the liked photos are present
        cy.getElement(this.getLikedImagesLocator()).each((element) => {
            cy.wrap(element).invoke('attr', 'title').then((title) => {
                expect(likedPhotos).to.include(title);
            });
        });
    }


}

export default ProfilePage;