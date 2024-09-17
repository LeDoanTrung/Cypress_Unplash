import BasePage from './BasePage';
import LoginPage from './LoginPage';
import PortfolioPage from './PorfolioPage';
import ProfilePage from './ProfilePage';

class HomePage extends BasePage {
    //Elements
    getImageLocator(number) { 
        return `//div[contains(@data-testid, 'masonry-grid')]//figure[@data-masonryposition='${number}']`;
    }
    
    getLikeIcon() { 
        return cy.getElement("//header//button[@title='Like this image']");
    }
    
    getProfileIcon() { 
        return cy.getElement("//div[@data-testid ='photos-route']//header//img[contains(@alt,'Go to')]");
    }

    getCloseBtn() { 
        return cy.getElement("//div[@aria-label='Modal']/div/button");
    }

    //Methods
    goToLoginPage() {
        this.header.goToLoginPage();
        return new LoginPage();
    }

    goToProfilePage(){
        this.header.goToProfilePage();
        return new ProfilePage();
    }

    clickImage(number) {
        cy.waitForPageLoad();
        cy.getElement(this.getImageLocator(number)).scrollAndClick();
    }

    goToUserPortfolioPage(){
        this.getProfileIcon().clickOnElement();
        return new PortfolioPage();
    }
}

export default HomePage;