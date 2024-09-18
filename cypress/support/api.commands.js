/**
 * @memberof cy
 * @method apiGetRequest
 * 
 * @example 
 * cy.apiGetRequest('https://api.example.com', headers)
 */
Cypress.Commands.add('apiGetRequest', (url, headers) => {
    const options = {
        method: 'GET',
        url: url,
        headers: headers
    };

    return cy.request(options);
});

/**
 * @memberof cy
 * @method apiPostRequest
 * 
 * @example 
 * cy.apiPostRequest('https://api.example.com', headers, body)
 */
Cypress.Commands.add('apiPostRequest', (url, headers, body) => {
    const options = {
        method: 'POST',
        url: url,
        headers: headers,
        body: body
    };

    return cy.request(options);
});

/**
 * @memberof cy
 * @method apiPutRequest
 * 
 * @example 
 * cy.apiPutRequest('https://api.example.com', headers, body)
 */
Cypress.Commands.add('apiPutRequest', (url, headers, body) => {
    const options = {
        method: 'PUT',
        url: url,
        headers: headers,
        body: body
    };

    return cy.request(options);
});

/**
 * @memberof cy
 * @method apiDeleteRequest
 * 
 * @example 
 * cy.apiDeleteRequest('https://api.example.com', headers)
 */
Cypress.Commands.add('apiDeleteRequest', (url, headers) => {
    const options = {
        method: 'DELETE',
        url: url,
        headers: headers
    };

    return cy.request(options);
});


/**
 * @memberof cy
 * @method apiIntercept
 * 
 * @example 
 * cy.apiIntercept('GET', 'https://api.example.com', { fixture: 'example.json' })
 * */

Cypress.Commands.add('apiIntercept', (method, url, response) => {
    const options = {
        method: method,
        url: url,
        response: response
    };

    return cy.intercept(options);
});