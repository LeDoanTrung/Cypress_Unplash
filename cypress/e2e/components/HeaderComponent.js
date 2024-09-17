export default class HeaderComponent {
    get loginBtn() { return cy.getElementByText('a','Log in'); }
    get viewProfileBtn() { return cy.getElement("//a[text()='View profile']"); }
    get avatarIcon() { return cy.getElement("//button[@title='Your personal menu button']"); }

    goToLoginPage() {
        this.loginBtn.forceClick();
    }

    goToProfilePage() {
        this.avatarIcon.forceClick().then(() => {
            this.viewProfileBtn.clickOnElement();
        });
    }


}