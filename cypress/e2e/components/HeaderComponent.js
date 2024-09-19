/**
 * HeaderComponent class encapsulates the elements and methods for interacting with the header section of the Unsplash application.
 */
export default class HeaderComponent {
    //Elements
    get loginBtn() { return cy.getElementByText('a','Log in'); }
    get viewProfileBtn() { return cy.getElement("//a[text()='View profile']"); }
    get avatarIcon() { return cy.getElement("//button[@title='Your personal menu button']"); }
    get homeIcon() { return cy.getElement("a[title='Home — Unsplash']"); }

    //Methods
    goToLoginPage() {
        cy.waitForPageLoad();
        this.loginBtn.forceClick();
        
    }

    goToProfilePage() {
        cy.waitForPageLoad();
        this.avatarIcon.forceClick().then(() => {
            this.viewProfileBtn.forceClick();
        });
        
    }

    goToHomePage(){
        cy.waitForPageLoad();
        this.homeIcon.forceClick();
    }
}