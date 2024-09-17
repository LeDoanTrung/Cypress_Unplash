import BasePage from "./BasePage"
import EditProfilePage from "./EditProfilePage";

class ProfilePage extends BasePage{
    //Elements
    get editBtn() { return cy.getElement("//a[text()='Edit profile']"); }

    get likeTab() { return cy.getElement("//a[text()='Likes']"); }

    get imageModal() { return cy.getElement("//button[@title='Zoom in on this image']/descendant::img[@alt]"); }


    goToEditProfilePage() {
        this.editBtn.clickOnElement();
        return new EditProfilePage();
    }

    isFullnameDisplayed(fullname) {
       const fullNameText = cy.getElement(`//div[text()='${fullname}']`);
       fullNameText.should('be.visible');
    }
}

export default ProfilePage;