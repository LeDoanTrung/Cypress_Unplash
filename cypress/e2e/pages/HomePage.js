import BasePage from './BasePage';
import LoginPage from './LoginPage';
import PortfolioPage from './PorfolioPage';
import ProfilePage from './ProfilePage';
import DataGenerator from '../../util/DataGenerator';
class HomePage extends BasePage {
    //Elements
    getImageLocator(number) { 
        return `//div[contains(@data-testid, 'masonry-grid')]//figure[@data-masonryposition='${number}']`;
    }
    
    getLikeIcon() { 
        return cy.getElement("//header//button[@title='Like this image']");
    }

    getUnlikeIcon() { 
        return cy.getElement("//header//button[@title='Unlike this image']");
    }
    
    getProfileIcon() { 
        return cy.getElement("//div[@data-testid ='photos-route']//header//img[contains(@alt,'Go to')]");
    }

    getCloseBtn() { 
        return cy.getElement("//div[@aria-label='Modal']/div/button");
    }

    getImageModal () {
        return cy.getElement("//button[@title='Zoom in on this image']/descendant::img[@alt]");
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

    goToHomePage(){
        this.header.goToHomePage();
    }

    clickImage(number) {
        cy.waitForPageLoad();
        cy.getElement(this.getImageLocator(number)).scrollAndClick();
    }

    goToUserPortfolioPage(){
        this.getProfileIcon().clickOnElement();
        return new PortfolioPage();
    }

    likeRandomPhotos(numberOfPhotos) {
        const likedPhotos = [];

        for (let i = 1; i <= numberOfPhotos; i++) {
            const randomNumber = DataGenerator.generateRandomNumber();
            this.clickImage(randomNumber);

            this.getImageModal().invoke('attr', 'alt').then((attributeValue) => {
                likedPhotos.push(attributeValue);

                this.getLikeIcon().forceClick().then(() => {
                    this.reloadPage().then(() => {
                        cy.waitForPageLoad();
                        this.header.goToHomePage();
                    });
                });
            });
        }
        return likedPhotos;
    }
}

export default HomePage;