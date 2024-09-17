import BasePage from './BasePage';


class LoginPage extends BasePage {
    get emailTextBox() { return cy.getElement('//input[@name="email"]'); }
    get passwordTextBox() { return cy.getElement('//input[@name="password"]'); }
    get loginBtn() { return cy.getElement('//button[text()="Login"]'); }

    loginWithUI(email, password) {
        this.emailTextBox.type(email);
        this.passwordTextBox.type(password);
        this.loginBtn.click();
    }
}

export default LoginPage;