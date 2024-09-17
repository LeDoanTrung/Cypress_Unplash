/**
 * @memberof cy
 * @method getElement
 * @param {string} locator - The CSS selector or XPath to get the element.
 * @param {number} [timeOut=4000] - The timeout in milliseconds for the element to be found.
 * @returns {Cypress.Chainable<JQuery<HTMLElement>>} - The Cypress chainable object.
 * 
 * @example
 * cy.getElement('.my-class');
 * cy.getElement('//button[text()="Submit"]');
 * cy.getElement('.my-element', 10000);
 */
Cypress.Commands.add('getElement', (locator, timeOut = 4000) => {
      const options = { timeout: timeOut };
      if (locator.startsWith('//')) {
          return cy.xpath(locator, options);
      } else {
          return cy.get(locator, options);
      }
  });

  
/**
 * @memberof cy
 * @method getElementByText
 * @param {string} selector - The CSS selector to narrow down the search.
 * @param {string} text - The text to find the element by.
 * @returns {Cypress.Chainable<JQuery<HTMLElement>>} - The Cypress chainable object.
 * 
 * @example
 * cy.getElementByText('a', 'Log in');
 */
Cypress.Commands.add('getElementByText', (selector, text) => {
  return cy.contains(selector, text);
});


/**
 * @memberof cy
 * @method waitForPageLoad
 * @param {number} [timeout=60000] - The timeout in milliseconds for the page to load.
 * @returns {Cypress.Chainable} - The Cypress chainable object.
 * 
 * @example
 * cy.waitForPageLoad();
 * cy.waitForPageLoad(30000);
 */
Cypress.Commands.add('waitForPageLoad', (timeout = 60000) => {
  cy.window({ timeout }).should('have.property', 'document').then((doc) => {
      cy.wrap(doc, { timeout }).should('have.property', 'readyState').and('eq', 'complete');
  });
});

/**
 * @memberof cy
 * @method clickOnElement
 * @returns {Cypress.Chainable<JQuery<HTMLElement>>} - The Cypress chainable object.
 * 
 * @example
 * cy.getElement('.my-class').click();
 */
Cypress.Commands.add('clickOnElement', { prevSubject: 'element' }, (subject) => {
  cy.wrap(subject).should('be.visible').then(($el) => {
      cy.wrap($el).click();
  });
});


  /**
 * @memberof cy
 * @method clearText
 * @returns {Cypress.Chainable<JQuery<HTMLElement>>} - The Cypress chainable object.
 * 
 * @example
 * cy.getElement('.my-input').clear();
 */
Cypress.Commands.add('clearText', { prevSubject: 'element' }, (subject) => {
    return cy.wrap(subject).should('be.visible').clear();
});

  /**
   * @memberof cy
   * @method typeText
   * @param {string} text - The text to type into the element.
   * @returns {Cypress.Chainable<JQuery<HTMLElement>>} - The Cypress chainable object.
   * 
   * @example
   * cy.getElement('.my-input').type('Hello World');
   */
  Cypress.Commands.add('typeText', { prevSubject: 'element' }, (subject, text) => {
    return cy.wrap(subject).should('be.visible').type(text);
  });

  
  /**
   * @memberof cy
   * @method checkBox
   * @returns {Cypress.Chainable<JQuery<HTMLElement>>} - The Cypress chainable object.
   * 
   * @example
   * cy.getElement('.my-checkbox').check();
   */
  Cypress.Commands.add('checkBox', { prevSubject: 'element' }, (subject) => {
    return cy.wrap(subject).should('be.visible').check();
  });
  
    /**
   * @memberof cy
   * @method uncheckBox
   * @returns {Cypress.Chainable<JQuery<HTMLElement>>} - The Cypress chainable object.
   * 
   * @example
   * cy.getElement('.my-checkbox').uncheck();
   */
    Cypress.Commands.add('uncheckBox', { prevSubject: 'element' }, (subject) => {
        return cy.wrap(subject).should('be.visible').uncheck();
    });
    
  /**
 * @memberof cy
 * @method forceClick
 * @returns {Cypress.Chainable<JQuery<HTMLElement>>} - The Cypress chainable object.
 * 
 * @example
 * cy.getElement('.my-class').forceClick();
 */
    Cypress.Commands.add('forceClick', { prevSubject: 'element' }, (subject) => {
        return cy.wrap(subject).click({ force: true });
    });

    /**
 * @memberof cy
 * @method selectElement
 * @param {string} text - The text to select from the dropdown.
 * @returns {Cypress.Chainable<JQuery<HTMLElement>>} - The Cypress chainable object.
 * 
 * @example
 * cy.getElement('.my-select').select('Option 1');
 */
Cypress.Commands.add('selectElement', { prevSubject: 'element' }, (subject, text) => {
    return cy.wrap(subject).should('be.visible').select(text);
});


/**
 * @memberof cy
 * @method dblclickElement
 * @returns {Cypress.Chainable<JQuery<HTMLElement>>} - The Cypress chainable object.
 * 
 * @example
 * cy.getElement('.my-element').dblclick();
 */
Cypress.Commands.add('dblclickElement', { prevSubject: 'element' }, (subject) => {
    return cy.wrap(subject).should('be.visible').dblclick();
});

/**
 * @memberof cy
 * @method rightclickElement
 * @returns {Cypress.Chainable<JQuery<HTMLElement>>} - The Cypress chainable object.
 * 
 * @example
 * cy.getElement('.my-element').rightclick();
 */
Cypress.Commands.add('rightclickElement', { prevSubject: 'element' }, (subject) => {
    return cy.wrap(subject).should('be.visible').rightclick();
});

/**
 * @memberof cy
 * @method hover
 * @returns {Cypress.Chainable<JQuery<HTMLElement>>} - The Cypress chainable object.
 * 
 * @example
 * cy.getElement('.my-element').hover();
 */
Cypress.Commands.add('hover', { prevSubject: 'element' }, (subject) => {
    return cy.wrap(subject).trigger('mouseover');
});

/**
 * @memberof cy
 * @method scrollIntoViewElement
 * @returns {Cypress.Chainable<JQuery<HTMLElement>>} - The Cypress chainable object.
 * 
 * @example
 * cy.getElement('.my-element').scrollIntoView();
 */
Cypress.Commands.add('scrollIntoViewElement', { prevSubject: 'element' }, (subject) => {
    return cy.wrap(subject).scrollIntoView();
});

/**
 * @memberof cy
 * @method scrollAndClick
 * @returns {Cypress.Chainable<JQuery<HTMLElement>>} - The Cypress chainable object.
 * 
 * @example
 * cy.getElement('.my-element').scrollAndClick();
 */
Cypress.Commands.add('scrollAndClick', { prevSubject: 'element' }, (subject) => {
  return cy.wrap(subject).scrollIntoView().should('be.visible').clickOnElement();
});

/**
 * @memberof cy
 * @method isVisible
 * @returns {Cypress.Chainable<JQuery<HTMLElement>>} - The Cypress chainable object.
 * 
 * @example
 * cy.getElement('.my-element').isVisible();
 */
Cypress.Commands.add('isVisible', { prevSubject: 'element' }, (subject) => {
    return cy.wrap(subject).should('be.visible');
});

/**
 * @memberof cy
 * @method isClickable
 * @returns {Cypress.Chainable<JQuery<HTMLElement>>} - The Cypress chainable object.
 * 
 * @example
 * cy.getElement('.my-element').isClickable();
 */
Cypress.Commands.add('isClickable', { prevSubject: 'element' }, (subject) => {
    return cy.wrap(subject).should('not.be.disabled').and('be.visible');
});

/**
 * @memberof cy
 * @method isDisabled
 * @returns {Cypress.Chainable<JQuery<HTMLElement>>} - The Cypress chainable object.
 * 
 * @example
 * cy.getElement('.my-element').isDisabled();
 */
Cypress.Commands.add('isDisabled', { prevSubject: 'element' }, (subject) => {
    return cy.wrap(subject).should('be.disabled');
});

/**
 * @memberof cy
 * @method getText
 * @returns {Cypress.Chainable<string>} - The text content of the element.
 * 
 * @example
 * cy.getElement('.my-element').getText().then((text) => {
 *     cy.log(text);
 * });
 */
Cypress.Commands.add('getText', { prevSubject: 'element' }, (subject) => {
  return cy.wrap(subject).invoke('text');
});