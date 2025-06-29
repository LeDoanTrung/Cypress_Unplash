// ***********************************************************
// This example support/e2e.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './api.commands';
import './element.command';
import '@cypress/grep';
require('cypress-xpath');

// Import Mochawesome reporter cho báo cáo
import 'cypress-mochawesome-reporter/register';

// Đảm bảo rằng có thư mục báo cáo
before(() => {
  cy.task('log', 'Setting up test report directories');
});

// Thêm hook để xử lý các lỗi và vẫn tạo báo cáo
Cypress.on('test:after:run', (test, runnable) => {
  if (test.state === 'failed') {
    console.log(`Test failed: ${test.title}`);
  }
});

// Alternatively you can use CommonJS syntax:
// require('./commands')

Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false
})