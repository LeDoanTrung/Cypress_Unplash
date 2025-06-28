import HomePage from "../../pages/HomePage";
describe('Following User Test', { tags: ['@ui', '@smoke'] }, () => {

    let homepage;
    let portfolioPage;

    before(() => {
        homepage = new HomePage();
    });

    beforeEach(() =>{
        homepage.open('/');
        cy.fixture('user.json').as('user');
    });

    it('Should follow a photographer of the third picture successfully', { tags: ['@happyCase'] }, function()  {
        const email = this.user.email;
        const password = this.user.password;

        //Login
        const loginPage = homepage.goToLoginPage();
        loginPage.loginWithUI(email, password);

        //Click on the third image
        homepage.clickImage(3);

        //Go to the portfolio page
        portfolioPage = homepage.goToUserPortfolioPage();

        //Follow the user
        portfolioPage.followUser();

        //Verify the user is followed
        portfolioPage.isFollowed();

    });

    afterEach(() => {
        //Unfollow the user after the test
        portfolioPage.unfollowUser();
    });
});