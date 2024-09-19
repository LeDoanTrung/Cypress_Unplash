const fs = require('fs');

/**
 * Updates a JSON file by setting a specified key to a given value.
 * 
 * @param {string} filePath - The path to the JSON file to be updated.
 * @param {string} key - The key in the JSON file to be updated.
 * @param {*} value - The value to set for the specified key.
 */
function updateJsonFile(filePath, key, value) {
    
    cy.readFile(filePath).then((data) => {
        data[key] = value;
        cy.writeFile(filePath, data);
    });
}

module.exports = { updateJsonFile };