import BasePage from "./BasePage";

class EditProfilePage extends BasePage{

    //Elements
    get userNameTextBox() { return cy.get('#user_username'); }

    get updateBtn() { return cy.getElement("input[value ='Update account']"); }

    get updatedMessage() { return cy.getElement("//div[normalize-space()='Account updated!']"); }

    //Methods
    editUserName(newName) {
        this.userNameTextBox.clearText().typeText(newName);
        this.updateBtn.scrollAndClick();
    }

    isUpdateMessageDisplayed() {
        return this.updatedMessage.isVisible();
    }
}

export default EditProfilePage;