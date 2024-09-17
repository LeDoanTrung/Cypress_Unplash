import BasePage from "./BasePage";

class PortfolioPage extends BasePage{
    //Elements
    get moreActionsBtn() { return cy.getElement("//button[@title='More Actions']"); }

    get followBtn() { return cy.getElement("//button[@role='menuitem']/.."); }  

    get messageBtn() { return cy.getElement("//button[contains(@title, 'Message')]"); }

    //Methods
    followUser() {
        this.messageBtn.isVisible().then(() => {
            this.moreActionsBtn.clickOnElement();
            this.followBtn.clickOnElement();
        })
    }

    isFollowed() {
        return this.followBtn.getText().then((text) => {
            return text.includes("Unfollow");
        });
    }

    unfollowUser() {
        this.followBtn.clickOnElement();
    }
}

export default PortfolioPage;