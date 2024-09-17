const fs = require('fs');

function updateJsonFile(filePath, key, value) {
    
    cy.readFile(filePath).then((data) => {
        data[key] = value;
        cy.writeFile(filePath, data);
    });
}

module.exports = { updateJsonFile };