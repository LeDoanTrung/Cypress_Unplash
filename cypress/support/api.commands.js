/**
 * @memberof cy
 * @method apiRequest   
 * 
 * */

Cypress.Commands.add('apiRequest', (method, url, headers, body = null) => {
    const options = {
        method: method,
        url: url,
        headers: headers
    };

    if (body) {
        options.body = body;
    }

    return cy.request(options);
}
);


