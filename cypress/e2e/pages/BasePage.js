import HeaderComponent from "../components/HeaderComponent";

class BasePage {
    constructor() {
        this.header = new HeaderComponent();
    }

    open(path) {
       return cy.visit(path);
    }

    goToProfilePageViaURL(username) {
       const url = '/@' + username;
       this.open(url);
    }
}

export default BasePage;